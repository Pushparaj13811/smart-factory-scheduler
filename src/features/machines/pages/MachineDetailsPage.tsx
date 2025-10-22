// Machine Details Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MachineDetails } from '../components';
import { useMachine } from '../hooks';

export default function MachineDetailsPage() {
  const { t } = useTranslation(['machines', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: machine, isLoading, error } = useMachine(id);

  const handleEdit = () => {
    navigate(`/machines/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/machines');
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

      <MachineDetails machine={machine} onEdit={handleEdit} />
    </div>
  );
}
