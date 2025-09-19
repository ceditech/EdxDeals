'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package, X, CheckCircle, AlertTriangle } from 'lucide-react';

interface UploadVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { value: 'demo', label: 'Product Demo' },
  { value: 'review', label: 'Product Review' },
  { value: 'unboxing', label: 'Unboxing' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'testimonial', label: 'Customer Testimonial' },
];

// Mock product data for autocomplete
const mockProducts = [
  { id: 'elec-001', name: 'Wireless Bluetooth Headphones Pro', price: '$129.99' },
  { id: 'elec-002', name: 'Smart Fitness Tracker Watch', price: '$89.99' },
  { id: 'home-001', name: 'Smart LED Light Bulbs Set', price: '$39.99' },
  { id: '4', name: 'Wireless Gaming Mouse', price: '$59.99' },
  { id: '5', name: 'Portable Bluetooth Speaker', price: '$89.99' },
  { id: '6', name: 'Laptop Stand Adjustable', price: '$39.99' },
];

export default function UploadVideoModal({ open, onOpenChange }: UploadVideoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: '',
    linkedProduct: '',
    videoType: 'file', // 'file' or 'url'
    videoFile: null as File | null,
    videoUrl: '',
    tags: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
      const maxSize = 500 * 1024 * 1024; // 500MB

      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, videoFile: 'Please upload a valid video file (MP4, WebM, OGG, AVI, MOV)' }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, videoFile: 'File size must be less than 500MB' }));
        return;
      }

      setFormData(prev => ({ ...prev, videoFile: file }));
      setErrors(prev => ({ ...prev, videoFile: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.title.trim()) newErrors.title = 'Video title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    
    if (formData.videoType === 'file' && !formData.videoFile) {
      newErrors.videoFile = 'Please upload a video file';
    } else if (formData.videoType === 'url' && !formData.videoUrl.trim()) {
      newErrors.videoUrl = 'Please enter a video URL';
    } else if (formData.videoType === 'url' && formData.videoUrl.trim()) {
      // Basic URL validation
      try {
        new URL(formData.videoUrl);
      } catch {
        newErrors.videoUrl = 'Please enter a valid URL';
      }
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      console.log('Video submission:', formData);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        handleClear();
        onOpenChange(false);
      }, 2000);
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      title: '',
      description: '',
      category: '',
      linkedProduct: '',
      videoType: 'file',
      videoFile: null,
      videoUrl: '',
      tags: '',
      agreeToTerms: false,
    });
    setErrors({});
    setSubmitStatus('idle');
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      // Reset form when closing
      setTimeout(handleClear, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-500" />
            Submit Your Video
          </DialogTitle>
          <DialogDescription>
            Share your product video with the EdxDeals community. All submissions are reviewed before publishing.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Video submitted successfully! We'll review it and notify you via email once it's approved.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              Failed to submit video. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Video Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Video Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Video Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter a descriptive title for your video"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your video content, what viewers will learn, and key highlights..."
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select video category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedProduct">Linked Product (Optional)</Label>
                <Select value={formData.linkedProduct} onValueChange={(value) => handleInputChange('linkedProduct', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="Enter tags separated by commas (e.g., wireless, bluetooth, headphones)"
              />
              <p className="text-sm text-muted-foreground">
                Tags help users discover your video. Use relevant keywords.
              </p>
            </div>
          </div>

          {/* Video Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Video Upload</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={formData.videoType === 'file' ? 'default' : 'outline'}
                  onClick={() => handleInputChange('videoType', 'file')}
                >
                  Upload File
                </Button>
                <Button
                  type="button"
                  variant={formData.videoType === 'url' ? 'default' : 'outline'}
                  onClick={() => handleInputChange('videoType', 'url')}
                >
                  YouTube/Vimeo URL
                </Button>
              </div>

              {formData.videoType === 'file' ? (
                <div className="space-y-2">
                  <Label htmlFor="videoFile">Video File *</Label>
                  <Input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className={errors.videoFile ? 'border-red-500' : ''}
                  />
                  {errors.videoFile && <p className="text-sm text-red-500">{errors.videoFile}</p>}
                  <p className="text-sm text-muted-foreground">
                    Supported formats: MP4, WebM, OGG, AVI, MOV. Max size: 500MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL *</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                    className={errors.videoUrl ? 'border-red-500' : ''}
                  />
                  {errors.videoUrl && <p className="text-sm text-red-500">{errors.videoUrl}</p>}
                  <p className="text-sm text-muted-foreground">
                    Enter a YouTube or Vimeo URL for your video
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                className={errors.agreeToTerms ? 'border-red-500' : ''}
              />
              <div className="space-y-1">
                <Label htmlFor="agreeToTerms" className="text-sm font-normal cursor-pointer">
                  I agree to the Terms of Service and Content Policy *
                </Label>
                <p className="text-xs text-muted-foreground">
                  By submitting, you confirm that you own the rights to this content and agree to our community guidelines.
                </p>
                {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Video'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleClear} disabled={isSubmitting}>
              Clear
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}