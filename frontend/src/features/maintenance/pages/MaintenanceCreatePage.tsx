// Maintenance Create Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MaintenanceForm } from '../components/MaintenanceForm';
import { useCreateMaintenance } from '../hooks';
import type { CreateMaintenanceInput, UpdateMaintenanceInput } from '../types';
import { toast } from 'sonner';

export default function MaintenanceCreatePage() {
  const { t } = useTranslation(['maintenance', 'common']);
  const navigate = useNavigate();
  const createMaintenance = useCreateMaintenance();

  const handleSubmit = async (data: CreateMaintenanceInput | UpdateMaintenanceInput) => {
    try {
      await createMaintenance.mutateAsync(data as CreateMaintenanceInput);
      toast.success(t('messages.maintenanceCreated'));
      navigate('/maintenance');
    } catch (error) {
      toast.error(t('messages.createError'));
    }
  };

  const handleCancel = () => {
    navigate('/maintenance');
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleCancel} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common:actions.back')}
      </Button>

      <PageHeader
        title={t('createMaintenance')}
        description={t('createMaintenanceDescription')}
      />

      <Card>
        <CardContent className="pt-6">
          <MaintenanceForm
            onSubmit={handleSubmit}
            isSubmitting={createMaintenance.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
