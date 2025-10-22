// Component Edit Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { ComponentForm } from '../components';
import { useComponent, useUpdateComponent } from '../hooks';
import type { ComponentFormData } from '../types';

export default function ComponentEditPage() {
  const { t } = useTranslation(['componentsFeature', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: component, isLoading, error } = useComponent(id!);
  const updateComponent = useUpdateComponent();

  const handleSubmit = (data: ComponentFormData) => {
    if (!id) return;

    updateComponent.mutate(
      { id, data },
      {
        onSuccess: () => {
          navigate(`/components/${id}`);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`/components/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !component) {
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
        title={t('editComponent')}
        description={component.name}
      />

      <ComponentForm
        component={component}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={updateComponent.isPending}
      />
    </div>
  );
}
