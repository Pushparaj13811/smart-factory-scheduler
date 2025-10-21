// User Details Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserDetails } from '../components';
import { useUser } from '../hooks';

export default function UserDetailsPage() {
  const { t } = useTranslation(['users', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useUser(id!);

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/users');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !user) {
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
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common:actions.back')}
        </Button>
        <Button onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          {t('common:actions.edit')}
        </Button>
      </div>

      <UserDetails user={user} />
    </div>
  );
}
