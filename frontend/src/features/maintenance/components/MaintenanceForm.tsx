// Maintenance Form component

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { MaintenanceRecord, CreateMaintenanceInput, UpdateMaintenanceInput } from '../types';
import { MaintenanceType, MaintenanceStatus } from '../types';

interface MaintenanceFormProps {
  record?: MaintenanceRecord;
  onSubmit: (data: CreateMaintenanceInput | UpdateMaintenanceInput) => void;
  isSubmitting?: boolean;
  machines?: Array<{ id: string; name: string }>;
}

export function MaintenanceForm({ record, onSubmit, isSubmitting, machines = [] }: MaintenanceFormProps) {
  const { t } = useTranslation(['maintenance', 'common']);

  const form = useForm({
    defaultValues: record ? {
      machineId: record.machineId,
      type: record.type,
      status: record.status,
      scheduledDate: record.scheduledDate ? new Date(record.scheduledDate).toISOString().split('T')[0] : '',
      completedDate: record.completedDate ? new Date(record.completedDate).toISOString().split('T')[0] : '',
      technician: record.technician || '',
      cost: record.cost?.toString() || '',
      notes: record.notes || '',
      description: record.description || '',
    } : {
      machineId: '',
      type: 'routine' as const,
      status: 'scheduled' as const,
      scheduledDate: '',
      completedDate: '',
      technician: '',
      cost: '',
      notes: '',
      description: '',
    },
  });

  const handleSubmit = (data: any) => {
    const formattedData = {
      ...data,
      cost: data.cost ? parseFloat(data.cost) : undefined,
      completedDate: data.completedDate || undefined,
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="machineId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.machine')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.selectMachine')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {machines.map((machine) => (
                    <SelectItem key={machine.id} value={machine.id}>
                      {machine.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.type')}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={MaintenanceType.ROUTINE}>{t('type.routine')}</SelectItem>
                    <SelectItem value={MaintenanceType.PREVENTIVE}>{t('type.preventive')}</SelectItem>
                    <SelectItem value={MaintenanceType.CORRECTIVE}>{t('type.corrective')}</SelectItem>
                    <SelectItem value={MaintenanceType.EMERGENCY}>{t('type.emergency')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {record && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.status')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={MaintenanceStatus.SCHEDULED}>{t('status.scheduled')}</SelectItem>
                      <SelectItem value={MaintenanceStatus.IN_PROGRESS}>{t('status.in_progress')}</SelectItem>
                      <SelectItem value={MaintenanceStatus.COMPLETED}>{t('status.completed')}</SelectItem>
                      <SelectItem value={MaintenanceStatus.CANCELLED}>{t('status.cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="scheduledDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.scheduledDate')}</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {record && (
            <FormField
              control={form.control}
              name="completedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('form.completedDate')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="technician"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.technician')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('form.technicianPlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.cost')}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.01" placeholder="0.00" />
                </FormControl>
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
                <Textarea {...field} placeholder={t('form.descriptionPlaceholder')} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.notes')}</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder={t('form.notesPlaceholder')} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('common:states.saving') : t('common:actions.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
