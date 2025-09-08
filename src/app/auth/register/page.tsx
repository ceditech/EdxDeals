'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { registerSchema, sellerRegisterSchema, type RegisterFormData, type SellerRegisterFormData } from '@/lib/validation';
import { countries, US_STATES, CANADIAN_PROVINCES } from '@/lib/location-data';
import { INDUSTRIES, BUSINESS_TYPES, COMPANY_SIZES } from '@/lib/industry-data';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [userType, setUserType] = useState<'user' | 'seller'>('user');
  const router = useRouter();

  const currentSchema = userType === 'seller' ? sellerRegisterSchema : registerSchema;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    clearErrors,
    reset
  } = useForm<RegisterFormData | SellerRegisterFormData>({
    resolver: zodResolver(currentSchema),
    mode: 'onChange',
    defaultValues: {
      userType: 'user'
    }
  });

  const selectedCountry = watch('country');

  const onSubmit = async (data: RegisterFormData | SellerRegisterFormData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // TODO: Implement Firebase Auth registration logic here
      console.log('Registration attempt:', data);
      
      // Mock successful registration for now
      setTimeout(() => {
        setIsLoading(false);
        router.push('/auth/welcome');
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      setAuthError('Registration failed. Please try again.');
    }
  };

  const handleCountryChange = (value: string) => {
    setValue('country', value);
    // Clear location-specific fields when country changes
    setValue('city', '');
    setValue('state', '');
    setValue('postalCode', '');
    clearErrors(['city', 'state', 'postalCode']);
  };

  const handleUserTypeChange = (value: 'user' | 'seller') => {
    setUserType(value);
    setValue('userType', value);
    
    // Reset form when switching user types to clear validation errors
    const currentValues = watch();
    reset({
      userType: value,
      firstName: currentValues.firstName || '',
      lastName: currentValues.lastName || '',
      email: currentValues.email || '',
      phone: currentValues.phone || '',
    });
  };

  const getLocationFields = () => {
    switch (selectedCountry) {
      case 'US':
        return {
          cityLabel: 'City',
          stateLabel: 'State',
          stateOptions: US_STATES,
          postalLabel: 'Zip Code',
          postalPlaceholder: '12345',
        };
      case 'CA':
        return {
          cityLabel: 'City',
          stateLabel: 'Province',
          stateOptions: CANADIAN_PROVINCES,
          postalLabel: 'Postal Code',
          postalPlaceholder: 'A1A 1A1',
        };
      default:
        return {
          cityLabel: 'City',
          stateLabel: 'Region/Province',
          stateOptions: null,
          postalLabel: 'Postal Code',
          postalPlaceholder: 'Enter postal code',
        };
    }
  };

  const locationFields = getLocationFields();

  return (
    <div className="bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="flex items-center justify-center px-4 py-8 min-h-screen">
        <Card className="w-full max-w-4xl shadow-xl border-0 bg-background/95 backdrop-blur">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{userType === 'seller' ? '🏪' : '📝'}</span>
            </div>
            <CardTitle className="text-3xl font-bold">
              {userType === 'seller' ? 'Create Seller Account' : 'Create Your Account'}
            </CardTitle>
            <p className="text-muted-foreground">
              {userType === 'seller' 
                ? 'Start selling on EdxDeals marketplace' 
                : 'Join EdxDeals and start your shopping journey'
              }
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {authError && (
              <Alert variant="destructive">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Account Type</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={handleUserTypeChange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-muted/50 transition-colors ${userType === 'user' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="user" id="user-type" />
                    <Label htmlFor="user-type" className="flex items-center gap-3 cursor-pointer">
                      <span className="text-2xl">👤</span>
                      <div>
                        <div className="font-semibold">Customer Account</div>
                        <div className="text-sm text-muted-foreground">Shop and buy products</div>
                      </div>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-muted/50 transition-colors ${userType === 'seller' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <RadioGroupItem value="seller" id="seller-type" />
                    <Label htmlFor="seller-type" className="flex items-center gap-3 cursor-pointer">
                      <span className="text-2xl">🏪</span>
                      <div>
                        <div className="font-semibold">Seller Account</div>
                        <div className="text-sm text-muted-foreground">Sell your products</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Seller Business Information */}
              {userType === 'seller' && (
                <div className="space-y-4 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    <span>🏢</span>
                    Business Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
                      <Input
                        id="companyName"
                        {...register('companyName' as keyof (RegisterFormData | SellerRegisterFormData))}
                        type="text"
                        placeholder="Enter your company name"
                        className="h-12"
                      />
                      {(errors as any).companyName && (
                        <p className="text-sm text-red-500">{(errors as any).companyName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="text-sm font-medium">Business Type</Label>
                      <Select onValueChange={(value) => setValue('businessType' as any, value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {BUSINESS_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {(errors as any).businessType && (
                        <p className="text-sm text-red-500">{(errors as any).businessType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                      <Select onValueChange={(value) => setValue('industry' as any, value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {(errors as any).industry && (
                        <p className="text-sm text-red-500">{(errors as any).industry.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companySize" className="text-sm font-medium">Company Size</Label>
                      <Select onValueChange={(value) => setValue('companySize' as any, value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {(errors as any).companySize && (
                        <p className="text-sm text-red-500">{(errors as any).companySize.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-sm font-medium">Website (Optional)</Label>
                      <Input
                        id="website"
                        {...register('website' as any)}
                        type="url"
                        placeholder="https://yourcompany.com"
                        className="h-12"
                      />
                      {(errors as any).website && (
                        <p className="text-sm text-red-500">{(errors as any).website.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxId" className="text-sm font-medium">Tax ID / EIN</Label>
                      <Input
                        id="taxId"
                        {...register('taxId' as any)}
                        type="text"
                        placeholder="Enter your tax ID"
                        className="h-12"
                      />
                      {(errors as any).taxId && (
                        <p className="text-sm text-red-500">{(errors as any).taxId.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription" className="text-sm font-medium">Business Description</Label>
                    <Textarea
                      id="businessDescription"
                      {...register('businessDescription' as any)}
                      placeholder="Describe your business and the products you sell..."
                      className="min-h-[100px]"
                    />
                    {(errors as any).businessDescription && (
                      <p className="text-sm text-red-500">{(errors as any).businessDescription.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      type="text"
                      placeholder="Enter your first name"
                      className={`h-12 ${errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      type="text"
                      placeholder="Enter your last name"
                      className={`h-12 ${errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <Input
                      id="email"
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email"
                      className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      type="tel"
                      placeholder="Enter your phone number"
                      className={`h-12 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1" className="text-sm font-medium">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      {...register('addressLine1')}
                      type="text"
                      placeholder="Enter your street address"
                      className={`h-12 ${errors.addressLine1 ? 'border-red-500' : ''}`}
                    />
                    {errors.addressLine1 && (
                      <p className="text-sm text-red-500">{errors.addressLine1.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="addressLine2" className="text-sm font-medium">Address Line 2 (Optional)</Label>
                    <Input
                      id="addressLine2"
                      {...register('addressLine2')}
                      type="text"
                      placeholder="Apartment, suite, etc."
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                    <Select value={selectedCountry} onValueChange={handleCountryChange}>
                      <SelectTrigger className={`h-12 ${errors.country ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country.message}</p>
                    )}
                  </div>

                  {/* Adaptive Location Fields */}
                  {selectedCountry && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">{locationFields.cityLabel}</Label>
                        <Input
                          id="city"
                          {...register('city')}
                          type="text"
                          placeholder={`Enter your ${locationFields.cityLabel.toLowerCase()}`}
                          className={`h-12 ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium">{locationFields.stateLabel}</Label>
                        {locationFields.stateOptions ? (
                          <Select value={watch('state')} onValueChange={(value) => setValue('state', value)}>
                            <SelectTrigger className={`h-12 ${errors.state ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder={`Select ${locationFields.stateLabel.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {locationFields.stateOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id="state"
                            {...register('state')}
                            type="text"
                            placeholder={`Enter your ${locationFields.stateLabel.toLowerCase()}`}
                            className={`h-12 ${errors.state ? 'border-red-500' : ''}`}
                          />
                        )}
                        {errors.state && (
                          <p className="text-sm text-red-500">{errors.state.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-sm font-medium">{locationFields.postalLabel}</Label>
                        <Input
                          id="postalCode"
                          {...register('postalCode')}
                          type="text"
                          placeholder={locationFields.postalPlaceholder}
                          className={`h-12 ${errors.postalCode ? 'border-red-500' : ''}`}
                        />
                        {errors.postalCode && (
                          <p className="text-sm text-red-500">{errors.postalCode.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Security Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        className={`h-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="text-lg">
                          {showPassword ? '🙈' : '👁️'}
                        </span>
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Must contain uppercase, lowercase, and number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className={`h-12 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <span className="text-lg">
                          {showConfirmPassword ? '🙈' : '👁️'}
                        </span>
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-medium" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating {userType === 'seller' ? 'Seller' : ''} Account...
                  </div>
                ) : (
                  `Create ${userType === 'seller' ? 'Seller' : ''} Account`
                )}
              </Button>
            </form>

            <div className="text-center pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  href="/auth/signin" 
                  className="text-primary hover:text-primary/80 hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}