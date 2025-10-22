// User Edit Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { UserForm } from '../components';
import { useUser, useUpdateUser } from '../hooks';
import type { UserFormData } from '../types';

export default function UserEditPage() {
  const { t } = useTranslation(['users', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useUser(id!);
  const updateUser = useUpdateUser();

  const handleSubmit = (data: UserFormData) => {
    updateUser.mutate(
      { id: id!, ...data },
      {
        onSuccess: () => {
          navigate(`/users/${id}`);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`/users/${id}`);
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
        <Button variant="outline" onClick={() => navigate('/users')}>
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

      <PageHeader title={t('editUser')} description={t('subtitle')} />

      <UserForm
        user={user}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={updateUser.isPending}
      />
    </div>
  );
}
