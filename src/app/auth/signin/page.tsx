'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { loginSchema, type LoginFormData } from '@/lib/validation';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      userType: 'user'
    }
  });

  const userType = watch('userType');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // TODO: Implement Firebase Auth sign-in logic here
      console.log('Sign in attempt:', data);
      
      // Mock successful sign-in for now
      setTimeout(() => {
        setIsLoading(false);
        router.push('/');
      }, 1000);
      
    } catch (error) {
      setIsLoading(false);
      setAuthError('Sign in failed. Please check your credentials and try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // TODO: Implement Google OAuth sign-in
      console.log('Google sign-in attempt');
    } catch (error) {
      setAuthError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="flex items-center justify-center px-4 py-8 min-h-screen">
        <Card className="w-full max-w-md shadow-xl border-0 bg-background/95 backdrop-blur">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{userType === 'seller' ? '🏪' : '🔑'}</span>
            </div>
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <p className="text-muted-foreground">
              Sign in to your {userType === 'seller' ? 'seller' : 'EdxDeals'} account
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {authError && (
              <Alert variant="destructive">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Account Type</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setValue('userType', value as 'user' | 'seller')}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="flex items-center gap-2 cursor-pointer">
                      <span className="text-lg">👤</span>
                      <div>
                        <div className="font-medium">Customer</div>
                        <div className="text-xs text-muted-foreground">Shop and buy products</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller" className="flex items-center gap-2 cursor-pointer">
                      <span className="text-lg">🏪</span>
                      <div>
                        <div className="font-medium">Seller</div>
                        <div className="text-xs text-muted-foreground">Sell your products</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Email or Phone Number
                </Label>
                <Input
                  id="username"
                  {...register('username')}
                  type="text"
                  placeholder="Enter your email or phone number"
                  className={`h-12 ${errors.username ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
                  onChange={(e) => {
                    register('username').onChange(e);
                    if (authError) setAuthError('');
                  }}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`h-12 pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}`}
                    onChange={(e) => {
                      register('password').onChange(e);
                      if (authError) setAuthError('');
                    }}
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
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                disabled={isLoading || !isValid}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-medium border-2 hover:bg-muted"
              onClick={handleGoogleSignIn}
            >
              <span className="mr-3 text-lg">🔍</span>
              Sign in with Google
            </Button>

            <div className="text-center space-y-3 pt-4">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 hover:underline font-medium"
              >
                Forgot your password?
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-primary hover:text-primary/80 hover:underline font-medium"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}