// ForgotPasswordForm component

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';

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
import { useForgotPassword } from '../hooks/useForgotPassword';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { t } = useTranslation(['auth', 'common']);
  const forgotPassword = useForgotPassword();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await forgotPassword.mutateAsync(data);
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t('auth:forgotPassword.success')}</h1>
          <p className="text-muted-foreground">
            {t('auth:forgotPassword.successMessage', { email: form.getValues('email') })}
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => setEmailSent(false)}
            variant="outline"
            className="w-full"
          >
            {t('auth:forgotPassword.tryAnother')}
          </Button>
          <Link to="/login" className="block">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('auth:forgotPassword.backToLogin')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{t('auth:forgotPassword.title')}</h1>
          <p className="text-muted-foreground">
            {t('auth:forgotPassword.subtitle')}
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth:forgotPassword.email')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t('auth:forgotPassword.emailPlaceholder')}
                  disabled={forgotPassword.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={forgotPassword.isPending}
        >
          {forgotPassword.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {forgotPassword.isPending ? t('auth:forgotPassword.sending') : t('auth:forgotPassword.sendLink')}
        </Button>

        <Link to="/login" className="block">
          <Button variant="ghost" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth:forgotPassword.backToLogin')}
          </Button>
        </Link>
      </form>
    </Form>
  );
}
