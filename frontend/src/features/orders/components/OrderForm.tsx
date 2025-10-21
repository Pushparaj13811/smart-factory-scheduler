// Order Form component

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Order, CreateOrderInput, UpdateOrderInput } from '../types';
import { OrderPriority } from '../types';

interface OrderFormProps {
  order?: Order;
  onSubmit: (data: CreateOrderInput | UpdateOrderInput) => void;
  isSubmitting?: boolean;
}

export function OrderForm({ order, onSubmit, isSubmitting }: OrderFormProps) {
  const { t } = useTranslation(['orders', 'common']);
  
  const form = useForm({
    defaultValues: order ? {
      orderNumber: order.orderNumber,
      customer: order.customer,
      priority: order.priority,
      dueDate: order.dueDate ? new Date(order.dueDate).toISOString().split('T')[0] : '',
      notes: order.notes || '',
    } : {
      orderNumber: '',
      customer: { name: '', email: '', phone: '', company: '' },
      priority: 'medium' as const,
      dueDate: '',
      notes: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="orderNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.orderNumber')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('form.orderNumberPlaceholder')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customer.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.customerName')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('form.customerNamePlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.customerCompany')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('form.customerCompanyPlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.customerEmail')}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder={t('form.customerEmailPlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.customerPhone')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('form.customerPhonePlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.priority')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.priorityPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(OrderPriority).map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {t(`priority.${priority}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.dueDate')}</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.notes')}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={t('form.notesPlaceholder')} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            {t('common:actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('common:states.processing') : (order ? t('updateOrder') : t('createOrder'))}
          </Button>
        </div>
      </form>
    </Form>
  );
}
