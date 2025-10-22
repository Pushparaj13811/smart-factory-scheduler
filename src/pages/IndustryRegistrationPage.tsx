// Industry/Company registration page for SaaS onboarding

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Factory, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const registrationSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industryType: z.string().min(1, 'Please select an industry type'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  employeeCount: z.string().min(1, 'Please select employee count'),
  description: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function IndustryRegistrationPage() {
  const { t } = useTranslation(['landing', 'common']);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call for industry registration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(t('registration.success'));
      navigate('/login');
    } catch {
      toast.error(t('registration.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const industryTypes = [
    'Automotive',
    'Electronics',
    'Textile',
    'Pharmaceutical',
    'Food & Beverage',
    'Chemical',
    'Metal & Mining',
    'Other',
  ];

  const employeeCounts = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Factory className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">{t('appName')}</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/login">
              {t('common:actions.login')}
            </Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:actions.back')}
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t('registration.title')}</h1>
            <p className="text-muted-foreground">{t('registration.subtitle')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('registration.formTitle')}</CardTitle>
              <CardDescription>{t('registration.formDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('registration.companyInfo')}</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        {t('registration.companyName')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder={t('registration.companyNamePlaceholder')}
                        {...register('companyName')}
                      />
                      {errors.companyName && (
                        <p className="text-sm text-destructive">{errors.companyName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industryType">
                        {t('registration.industryType')} <span className="text-destructive">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue('industryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('registration.selectIndustry')} />
                        </SelectTrigger>
                        <SelectContent>
                          {industryTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.industryType && (
                        <p className="text-sm text-destructive">{errors.industryType.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">
                      {t('registration.employeeCount')} <span className="text-destructive">*</span>
                    </Label>
                    <Select onValueChange={(value) => setValue('employeeCount', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('registration.selectEmployeeCount')} />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeCounts.map((count) => (
                          <SelectItem key={count} value={count}>
                            {count} {t('registration.employees')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.employeeCount && (
                      <p className="text-sm text-destructive">{errors.employeeCount.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      {t('registration.address')} <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder={t('registration.addressPlaceholder')}
                      {...register('address')}
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('registration.description')}</Label>
                    <Textarea
                      id="description"
                      placeholder={t('registration.descriptionPlaceholder')}
                      {...register('description')}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('registration.contactInfo')}</h3>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">
                      {t('registration.contactPerson')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      placeholder={t('registration.contactPersonPlaceholder')}
                      {...register('contactPerson')}
                    />
                    {errors.contactPerson && (
                      <p className="text-sm text-destructive">{errors.contactPerson.message}</p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t('registration.email')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('registration.emailPlaceholder')}
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {t('registration.phone')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('registration.phonePlaceholder')}
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('registration.accountSecurity')}</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="password">
                        {t('registration.password')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t('registration.passwordPlaceholder')}
                        {...register('password')}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        {t('registration.confirmPassword')} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder={t('registration.confirmPasswordPlaceholder')}
                        {...register('confirmPassword')}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Benefits Reminder */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{t('registration.benefit1')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{t('registration.benefit2')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{t('registration.benefit3')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/')} className="flex-1">
                    {t('common:actions.cancel')}
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? t('registration.submitting') : t('registration.submit')}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {t('registration.haveAccount')}{' '}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    {t('common:actions.login')}
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
