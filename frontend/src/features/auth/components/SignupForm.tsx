// SignupForm component (multi-step)

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Loader2, ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignup } from '../hooks/useSignup';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  industryName: z.string().min(2, 'Industry name must be at least 2 characters').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const { t } = useTranslation(['auth', 'common']);
  const signup = useSignup();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      industryName: '',
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    signup.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
      industryName: data.industryName,
    });
  };

  const nextStep = async () => {
    const fields = step === 1 ? ['name', 'email'] : ['password', 'confirmPassword'];
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{t('auth:signup.title')}</h1>
          <p className="text-muted-foreground">
            {t('auth:signup.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          <div className="text-xs text-muted-foreground mb-2">
            {t('auth:signup.step')} {step} {t('auth:signup.stepOf')} 3
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth:signup.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('auth:signup.namePlaceholder')} />
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
                  <FormLabel>{t('auth:signup.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder={t('auth:signup.emailPlaceholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={nextStep} className="w-full">
              {t('auth:signup.continue')}
            </Button>
          </div>
        )}

        {/* Step 2: Password */}
        {step === 2 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth:signup.password')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth:signup.passwordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth:signup.confirmPassword')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('auth:signup.confirmPasswordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t('auth:signup.back')}
              </Button>
              <Button type="button" onClick={nextStep} className="flex-1">
                {t('auth:signup.continue')}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Industry (Optional) */}
        {step === 3 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="industryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth:signup.industryName')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('auth:signup.industryNamePlaceholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t('auth:signup.back')}
              </Button>
              <Button type="submit" className="flex-1" disabled={signup.isPending}>
                {signup.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {signup.isPending ? t('auth:signup.creatingAccount') : t('auth:signup.signupButton')}
              </Button>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          {t('auth:signup.hasAccount')}{' '}
          <Link to="/login" className="text-primary hover:underline">
            {t('auth:signup.loginLink')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
