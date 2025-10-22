// Machine Form component for create/edit

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
import type { Machine, CreateMachineInput } from '../types';
import { MachineType } from '../types';

interface MachineFormProps {
  machine?: Machine;
  onSubmit: (data: CreateMachineInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function MachineForm({ machine, onSubmit, onCancel, isSubmitting }: MachineFormProps) {
  const { t } = useTranslation(['machines', 'common']);

  const form = useForm<CreateMachineInput>({
    defaultValues: machine
      ? {
          name: machine.name,
          model: machine.model,
          manufacturer: machine.manufacturer,
          type: machine.type,
          capacity: machine.capacity,
          location: machine.location,
          purchaseDate: machine.purchaseDate,
          installationDate: machine.installationDate,
          warrantyExpiry: machine.warrantyExpiry,
          description: machine.description,
        }
      : {
          name: '',
          model: '',
          manufacturer: '',
          type: MachineType.OTHER,
          capacity: 0,
          location: '',
          purchaseDate: '',
          description: '',
        },
  });

  const handleSubmit = (data: CreateMachineInput) => {
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
                  name="model"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.model')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.modelPlaceholder')} {...field} />
                      </FormControl>
                      <FormDescription>{t('form.modelDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="manufacturer"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.manufacturer')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.manufacturerPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.type')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.typePlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={MachineType.CNC}>{t('types.cnc')}</SelectItem>
                          <SelectItem value={MachineType.LATHE}>{t('types.lathe')}</SelectItem>
                          <SelectItem value={MachineType.MILL}>{t('types.mill')}</SelectItem>
                          <SelectItem value={MachineType.DRILL}>{t('types.drill')}</SelectItem>
                          <SelectItem value={MachineType.GRINDER}>{t('types.grinder')}</SelectItem>
                          <SelectItem value={MachineType.PRESS}>{t('types.press')}</SelectItem>
                          <SelectItem value={MachineType.WELDING}>{t('types.welding')}</SelectItem>
                          <SelectItem value={MachineType.CUTTING}>{t('types.cutting')}</SelectItem>
                          <SelectItem value={MachineType.ASSEMBLY}>{t('types.assembly')}</SelectItem>
                          <SelectItem value={MachineType.PACKAGING}>{t('types.packaging')}</SelectItem>
                          <SelectItem value={MachineType.OTHER}>{t('types.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="capacity"
                  rules={{
                    required: t('common:validation.required'),
                    min: { value: 0, message: 'Capacity must be positive' },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.capacity')}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t('form.capacityPlaceholder')}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>{t('form.capacityDescription')}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.location')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.locationPlaceholder')} {...field} />
                      </FormControl>
                      <FormDescription>{t('form.locationDescription')}</FormDescription>
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

            {/* Purchase Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Purchase Information</h3>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="purchaseDate"
                  rules={{ required: t('common:validation.required') }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.purchaseDate')}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.installationDate')}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="warrantyExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.warrantyExpiry')}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
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
              : machine
              ? t('common:actions.update')
              : t('common:actions.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
