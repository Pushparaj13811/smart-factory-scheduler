// Component Form component for create/edit

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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import type { Component, ComponentFormData } from '../types';
import { ComponentCategory, ComponentStatus } from '../types';

interface ComponentFormProps {
  component?: Component;
  onSubmit: (data: ComponentFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ComponentForm({ component, onSubmit, onCancel, isSubmitting }: ComponentFormProps) {
  const { t } = useTranslation(['componentsFeature', 'common']);

  const form = useForm<ComponentFormData>({
    defaultValues: component
      ? {
          name: component.name,
          code: component.code,
          description: component.description,
          category: component.category,
          status: component.status,
          unit: component.unit,
          quantityInStock: component.quantityInStock,
          reorderLevel: component.reorderLevel,
          unitPrice: component.unitPrice,
          supplier: component.supplier,
          leadTimeDays: component.leadTimeDays,
          specifications: component.specifications,
        }
      : {
          name: '',
          code: '',
          description: '',
          category: ComponentCategory.MECHANICAL,
          status: ComponentStatus.IN_STOCK,
          unit: 'piece',
          quantityInStock: 0,
          reorderLevel: 10,
          unitPrice: 0,
          supplier: '',
          leadTimeDays: 7,
          specifications: {},
        },
  });

  const handleSubmit = (data: ComponentFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('details.overview')}</h3>

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
                      <FormDescription>{t('form.nameDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.code')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.codePlaceholder')} {...field} />
                      </FormControl>
                      <FormDescription>{t('form.codeDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.category')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.categoryPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ComponentCategory.MECHANICAL}>
                            {t('categories.mechanical')}
                          </SelectItem>
                          <SelectItem value={ComponentCategory.ELECTRONIC}>
                            {t('categories.electronic')}
                          </SelectItem>
                          <SelectItem value={ComponentCategory.ASSEMBLY}>
                            {t('categories.assembly')}
                          </SelectItem>
                          <SelectItem value={ComponentCategory.CUSTOM}>
                            {t('categories.custom')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.status')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.statusPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ComponentStatus.IN_STOCK}>
                            {t('status.in_stock')}
                          </SelectItem>
                          <SelectItem value={ComponentStatus.LOW_STOCK}>
                            {t('status.low_stock')}
                          </SelectItem>
                          <SelectItem value={ComponentStatus.OUT_OF_STOCK}>
                            {t('status.out_of_stock')}
                          </SelectItem>
                          <SelectItem value={ComponentStatus.DISCONTINUED}>
                            {t('status.discontinued')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                rules={{ required: t('common:validation.required') }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.description')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('form.descriptionPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Inventory Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">{t('details.inventory')}</h3>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="unit"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.unit')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.unitPlaceholder')} {...field} />
                      </FormControl>
                      <FormDescription>{t('form.unitDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantityInStock"
                  rules={{
                    required: t('common:validation.required'),
                    min: { value: 0, message: 'Quantity must be non-negative' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.quantityInStock')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t('form.quantityPlaceholder')}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reorderLevel"
                  rules={{
                    required: t('common:validation.required'),
                    min: { value: 0, message: 'Reorder level must be non-negative' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.reorderLevel')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t('form.reorderLevelPlaceholder')}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>{t('form.reorderLevelDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pricing & Supplier Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">{t('details.pricing')}</h3>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="unitPrice"
                  rules={{
                    required: t('common:validation.required'),
                    min: { value: 0, message: 'Price must be non-negative' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.unitPrice')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder={t('form.unitPricePlaceholder')}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.supplier')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.supplierPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leadTimeDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.leadTimeDays')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t('form.leadTimePlaceholder')}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>{t('form.leadTimeDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            {t('common:actions.cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t('common:states.processing')
              : component
              ? t('common:actions.update')
              : t('common:actions.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
