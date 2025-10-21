// User Form component for create/edit

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RoleSelector } from './RoleSelector';
import type { User } from '@/types/auth.types';
import type { UserFormData } from '../types';

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function UserForm({ user, onSubmit, onCancel, isSubmitting }: UserFormProps) {
  const { t } = useTranslation(['users', 'common']);

  const form = useForm<UserFormData>({
    defaultValues: user
      ? {
          email: user.email,
          name: user.name,
          role: user.role,
          industryId: user.industryId,
        }
      : {
          email: '',
          name: '',
          role: undefined as any,
          industryId: '',
          password: '',
        },
  });

  const handleSubmit = (data: UserFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('details.basicInfo')}</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.namePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: t('common:validation.required'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('common:validation.invalidEmail'),
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                rules={{ required: t('common:validation.required') }}
                render={({ field }) => (
                  <FormItem>
                    <RoleSelector
                      value={field.value}
                      onChange={field.onChange}
                      label={t('form.role')}
                      error={form.formState.errors.role?.message}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.industryId')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.industryIdPlaceholder')} {...field} />
                    </FormControl>
                    <FormDescription>{t('form.industryIdDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!user && (
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: !user ? t('common:validation.required') : false,
                    minLength: {
                      value: 8,
                      message: t('common:validation.minLength', { min: 8 }),
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.password')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('form.passwordPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{t('form.passwordDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            {t('common:actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t('common:states.processing')
              : user
                ? t('common:actions.update')
                : t('common:actions.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
