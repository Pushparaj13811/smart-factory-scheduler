// Machine Create Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { MachineForm } from '../components';
import { useCreateMachine } from '../hooks';
import type { CreateMachineInput } from '../types';

export default function MachineCreatePage() {
  const { t } = useTranslation(['machines', 'common']);
  const navigate = useNavigate();
  const createMachine = useCreateMachine();

  const handleSubmit = (data: CreateMachineInput) => {
    createMachine.mutate(data, {
      onSuccess: () => {
        navigate('/machines');
      },
    });
  };

  const handleCancel = () => {
    navigate('/machines');
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleCancel} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common:actions.back')}
      </Button>

      <PageHeader
        title={t('createMachine')}
        description={t('subtitle')}
      />

      <MachineForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createMachine.isPending}
      />
    </div>
  );
}
