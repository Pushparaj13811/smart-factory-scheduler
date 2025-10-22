// Component Details Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ComponentDetails } from '../components';
import { useComponent } from '../hooks';

export default function ComponentDetailsPage() {
  const { t } = useTranslation(['componentsFeature', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: component, isLoading, error } = useComponent(id!);

  const handleEdit = () => {
    navigate(`/components/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/components');
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
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common:actions.back')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common:actions.back')}
      </Button>

      <ComponentDetails component={component} onEdit={handleEdit} />
    </div>
  );
}
