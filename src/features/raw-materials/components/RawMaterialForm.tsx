// Raw Material Form component

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
import type { RawMaterialFormData } from '../types';
import { MaterialCategory } from '../types';

interface RawMaterialFormProps {
  initialData?: Partial<RawMaterialFormData>;
  onSubmit: (data: RawMaterialFormData) => void;
  isSubmitting?: boolean;
}

export function RawMaterialForm({ initialData, onSubmit, isSubmitting }: RawMaterialFormProps) {
  const { t } = useTranslation('rawMaterials');

  const form = useForm<RawMaterialFormData>({
    defaultValues: {
      name: initialData?.name || '',
      code: initialData?.code || '',
      description: initialData?.description || '',
      category: initialData?.category || MaterialCategory.METAL,
      unit: initialData?.unit || '',
      quantity: initialData?.quantity || 0,
      reorderLevel: initialData?.reorderLevel || 0,
      unitCost: initialData?.unitCost || 0,
      supplier: initialData?.supplier || '',
      supplierContact: initialData?.supplierContact || '',
      leadTimeDays: initialData?.leadTimeDays || 0,
      storageLocation: initialData?.storageLocation || '',
      specifications: initialData?.specifications || {},
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: t('form.nameDescription') }}
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
            rules={{ required: t('form.codeDescription') }}
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.description')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('form.descriptionPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.category')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.categoryPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(MaterialCategory).map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(`categories.${category}`)}
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
            name="unit"
            rules={{ required: true }}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="quantity"
            rules={{ required: true, min: 0 }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.quantity')}</FormLabel>
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
            rules={{ required: true, min: 0 }}
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

          <FormField
            control={form.control}
            name="unitCost"
            rules={{ required: true, min: 0 }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.unitCost')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={t('form.unitCostPlaceholder')}
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="supplier"
            rules={{ required: true }}
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
            name="supplierContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.supplierContact')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.supplierContactPlaceholder')} {...field} />
                </FormControl>
                <FormDescription>{t('form.supplierContactDescription')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>{t('form.leadTimeDescription')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storageLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.storageLocation')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.storageLocationPlaceholder')} {...field} />
                </FormControl>
                <FormDescription>{t('form.storageLocationDescription')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('common:actions.saving') : t('common:actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
