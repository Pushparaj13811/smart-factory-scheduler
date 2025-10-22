// Component Create Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { ComponentForm } from '../components';
import { useCreateComponent } from '../hooks';
import type { ComponentFormData } from '../types';

export default function ComponentCreatePage() {
  const { t } = useTranslation(['componentsFeature', 'common']);
  const navigate = useNavigate();
  const createComponent = useCreateComponent();

  const handleSubmit = (data: ComponentFormData) => {
    createComponent.mutate(data, {
      onSuccess: () => {
        navigate('/components');
      },
    });
  };

  const handleCancel = () => {
    navigate('/components');
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleCancel} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common:actions.back')}
      </Button>

      <PageHeader
        title={t('createComponent')}
        description={t('subtitle')}
      />

      <ComponentForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createComponent.isPending}
      />
    </div>
  );
}
