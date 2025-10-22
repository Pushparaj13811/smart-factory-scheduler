// Machine Edit Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { MachineForm } from '../components';
import { useMachine, useUpdateMachine } from '../hooks';
import type { UpdateMachineInput } from '../types';

export default function MachineEditPage() {
  const { t } = useTranslation(['machines', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: machine, isLoading, error } = useMachine(id);
  const updateMachine = useUpdateMachine();

  const handleSubmit = (data: UpdateMachineInput) => {
    if (!id) return;

    updateMachine.mutate(
      { id, data },
      {
        onSuccess: () => {
          navigate(`/machines/${id}`);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`/machines/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !machine) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive">{t('messages.loadError')}</p>
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
        title={t('editMachine')}
        description={machine.name}
      />

      <MachineForm
        machine={machine}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={updateMachine.isPending}
      />
    </div>
  );
}
