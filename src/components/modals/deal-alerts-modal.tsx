'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Phone, UserCircle, CheckCircle, Bell } from 'lucide-react';

// Form validation schema
const dealAlertsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().refine((phone) => {
    if (!phone || phone.trim() === '') return true;
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }, 'Please enter a valid phone number'),
});

type DealAlertsFormData = z.infer<typeof dealAlertsSchema>;

interface DealAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DealAlertsModal({ isOpen, onClose }: DealAlertsModalProps) {
  const [step, setStep] = useState<'form' | 'verification' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState<DealAlertsFormData | null>(null);

  const form = useForm<DealAlertsFormData>({
    resolver: zodResolver(dealAlertsSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: DealAlertsFormData) => {
    setIsSubmitting(true);
    setFormData(data);

    try {
      // Simulate API call to send verification codes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Move to verification step
      setStep('verification');
    } catch (error) {
      console.error('Failed to send verification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async () => {
    if (!verificationCode.trim()) return;
    
    setIsVerifying(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 4-digit code
      if (verificationCode.length >= 4) {
        // Store alert preferences (mock for now)
        console.log('Storing alert preferences:', formData);
        setStep('success');
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    // Reset form and state
    setStep('form');
    setVerificationCode('');
    setFormData(null);
    form.reset();
    onClose();
  };

  const renderFormStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Bell className="w-6 h-6 text-red-600" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Never Miss a Flash Deal!</DialogTitle>
          <DialogDescription className="text-base">
            Get instant notifications when new flash deals go live. We'll send you alerts via email and SMS.
          </DialogDescription>
        </DialogHeader>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  Full Name *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="h-12"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    className="h-12"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                    className="h-12"
                    autoComplete="tel"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground">
                  We'll send SMS alerts if you provide your phone number
                </p>
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Setting Up Alerts...
                </>
              ) : (
                'Set Up Alerts'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Mail className="w-6 h-6 text-blue-600" />
      </div>
      
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Verify Your Contact</DialogTitle>
        <DialogDescription className="text-base">
          We've sent verification codes to your email{formData?.phone ? ' and phone' : ''}. 
          Enter the code from your email to complete setup.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <label htmlFor="verification-code" className="block text-sm font-medium mb-2">
            Verification Code
          </label>
          <Input
            id="verification-code"
            type="text"
            placeholder="Enter 4-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="h-12 text-center text-lg font-mono tracking-widest"
            maxLength={6}
            autoComplete="one-time-code"
          />
        </div>

        <Alert>
          <AlertDescription>
            <strong>Demo:</strong> Enter any 4-digit code to continue (e.g., 1234)
          </AlertDescription>
        </Alert>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep('form')}
            className="flex-1"
            disabled={isVerifying}
          >
            Back
          </Button>
          <Button
            onClick={handleVerification}
            className="flex-1 bg-red-600 hover:bg-red-700"
            disabled={isVerifying || !verificationCode.trim()}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Complete'
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-green-700">
          You're All Set! 🎉
        </DialogTitle>
        <DialogDescription className="text-base">
          You'll get notified when a new flash deal is live! We'll send alerts to:
        </DialogDescription>
      </DialogHeader>

      <div className="bg-green-50 p-4 rounded-lg space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-green-600" />
          <span>{formData?.email}</span>
        </div>
        {formData?.phone && (
          <div className="flex items-center justify-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-green-600" />
            <span>{formData.phone}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        You can manage your alert preferences anytime in your account settings.
      </p>

      <Button
        onClick={handleClose}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        Done
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          // Prevent closing during verification step
          if (step === 'verification' && isVerifying) {
            e.preventDefault();
          }
        }}
      >
        {step === 'form' && renderFormStep()}
        {step === 'verification' && renderVerificationStep()}
        {step === 'success' && renderSuccessStep()}
      </DialogContent>
    </Dialog>
  );
}