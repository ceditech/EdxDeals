'use client';

import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { submitBrandApplication } from '../../lib/firebase/submitBrandApplication';
import { initAuth } from '../../lib/firebase';

const CATEGORIES = [
  'Electronics',
  'Apparel',
  'Home',
  'Beauty',
  'Sports',
  'Toys',
  'Automotive',
  'Food & Beverage',
  'Health',
  'Books',
  'Other',
] as const;

const schema = z.object({
  brandName: z.string().min(2, 'Brand name is required'),
  websiteUrl: z
    .string()
    .url('Enter a valid URL (including https://)')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  contactName: z.string().min(2, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone number is required'),
  category: z.string().min(1, 'Brand category is required'),
  description: z.string().min(10, 'Please provide a brief brand description'),
  agree: z.boolean().refine((v) => v, {
    message: 'You must agree to the Terms of Service and Privacy Policy',
  }),
});

type FormValues = z.infer<typeof schema>;

export default function PartnerWithUsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      brandName: '',
      websiteUrl: '',
      contactName: '',
      contactEmail: '',
      phone: '',
      category: '',
      description: '',
      agree: false,
    },
  });

  const agreed = watch('agree');

  // Optional: Prefill name/email if a user is logged in
  useEffect(() => {
    let unsubscribe: undefined | (() => void);
    (async () => {
      try {
        const auth = await initAuth();
        if (!auth) return;
        const { onAuthStateChanged } = await import('firebase/auth');
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const current = getValues();
            reset({
              ...current,
              contactName: user.displayName ?? current.contactName,
              contactEmail: user.email ?? current.contactEmail,
            });
          }
        });
      } catch {
        // no-op; auth optional
      }
    })();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getValues, reset]);

  const categories = useMemo(() => CATEGORIES, []);

  const onSubmit = async (values: FormValues) => {
    try {
      await submitBrandApplication({
        brandName: values.brandName,
        websiteUrl: values.websiteUrl,
        contactName: values.contactName,
        contactEmail: values.contactEmail,
        phone: values.phone,
        category: values.category,
        description: values.description,
        file,
      });

      toast({
        title: 'Thank you! Your brand application has been submitted.',
        description: 'Our team will review your submission and get back to you shortly.',
      });

      // Close after 2 seconds and reset form
      setTimeout(() => {
        onOpenChange(false);
        reset();
        setFile(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Submission failed',
        description: 'Please try again. If the issue persists, contact support.',
      });
    }
  };

  const onClear = () => {
    reset();
    setFile(null);
  };

  const onCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl sm:text-2xl">Partner with Us</DialogTitle>
          <DialogDescription>
            Apply to become a brand partner on EdxDeals. Tell us about your brand and products.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-6 pt-2 space-y-5"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Name */}
            <div className="space-y-1.5">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" placeholder="Acme Inc." aria-invalid={!!errors.brandName} {...register('brandName')} />
              {errors.brandName && (
                <p className="text-sm text-red-600">{errors.brandName.message}</p>
              )}
            </div>

            {/* Website URL (optional) */}
            <div className="space-y-1.5">
              <Label htmlFor="websiteUrl">Website URL (optional)</Label>
              <Input id="websiteUrl" placeholder="https://example.com" aria-invalid={!!errors.websiteUrl} {...register('websiteUrl')} />
              {errors.websiteUrl && (
                <p className="text-sm text-red-600">{errors.websiteUrl.message}</p>
              )}
            </div>

            {/* Contact Name */}
            <div className="space-y-1.5">
              <Label htmlFor="contactName">Contact Person Name</Label>
              <Input id="contactName" placeholder="Jane Doe" aria-invalid={!!errors.contactName} {...register('contactName')} />
              {errors.contactName && (
                <p className="text-sm text-red-600">{errors.contactName.message}</p>
              )}
            </div>

            {/* Contact Email */}
            <div className="space-y-1.5">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" placeholder="jane.doe@example.com" type="email" aria-invalid={!!errors.contactEmail} {...register('contactEmail')} />
              {errors.contactEmail && (
                <p className="text-sm text-red-600">{errors.contactEmail.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="(555) 123-4567" aria-invalid={!!errors.phone} {...register('phone')} />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Brand Category */}
            <div className="space-y-1.5">
              <Label htmlFor="category">Brand Category</Label>
              <Select
                onValueChange={(v) => setValue('category', v, { shouldValidate: true })}
                value={watch('category')}
              >
                <SelectTrigger id="category" aria-invalid={!!errors.category}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Brand Description</Label>
            <Textarea
              id="description"
              placeholder="Tell us about your brand, product lines, target audience, and any notable achievements."
              aria-invalid={!!errors.description}
              className="min-h-[120px]"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* File Upload (optional) */}
          <div className="space-y-1.5">
            <Label htmlFor="file">Logo/File Upload (optional)</Label>
            <input
              id="file"
              type="file"
              accept="image/*,.pdf"
              className="block w-full text-sm file:mr-4 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-2 file:text-foreground hover:file:bg-accent hover:file:text-accent-foreground"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
              }}
            />
            {file ? (
              <p className="text-xs text-muted-foreground">Selected: {file.name}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Accepted: images or PDF</p>
            )}
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-3 rounded-md border p-3">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(v) => setValue('agree', Boolean(v), { shouldValidate: true })}
            />
            <div className="space-y-1">
              <Label htmlFor="agree" className="cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="underline underline-offset-4">Terms of Service</Link> and{' '}
                <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
              </Label>
              {errors.agree && (
                <p className="text-sm text-red-600">{errors.agree.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClear}
              disabled={isSubmitting}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!agreed || isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}