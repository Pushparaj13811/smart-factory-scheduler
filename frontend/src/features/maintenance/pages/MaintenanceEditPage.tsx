// Maintenance Edit Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MaintenanceForm } from '../components/MaintenanceForm';
import { useMaintenanceRecord, useUpdateMaintenance } from '../hooks';
import type { UpdateMaintenanceInput } from '../types';
import { toast } from 'sonner';

export default function MaintenanceEditPage() {
  const { t } = useTranslation(['maintenance', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: record, isLoading, error } = useMaintenanceRecord(id!);
  const updateMaintenance = useUpdateMaintenance();

  const handleSubmit = async (data: UpdateMaintenanceInput) => {
    try {
      await updateMaintenance.mutateAsync({ id: id!, data });
      toast.success(t('messages.maintenanceUpdated'));
      navigate(`/maintenance/${id}`);
    } catch (error) {
      toast.error(t('messages.updateError'));
    }
  };

  const handleCancel = () => {
    navigate(`/maintenance/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive">{t('messages.loadError')}</p>
        <Button variant="outline" onClick={() => navigate('/maintenance')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common:actions.back')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleCancel} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common:actions.back')}
      </Button>

      <PageHeader
        title={t('editMaintenance')}
        description={t('editMaintenanceDescription')}
      />

      <Card>
        <CardContent className="pt-6">
          <MaintenanceForm
            record={record}
            onSubmit={handleSubmit}
            isSubmitting={updateMaintenance.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
