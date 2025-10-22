// User Create Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { UserForm } from '../components';
import { useCreateUser } from '../hooks';
import type { UserFormData } from '../types';

export default function UserCreatePage() {
  const { t } = useTranslation(['users', 'common']);
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const handleSubmit = (data: UserFormData) => {
    createUser.mutate(data, {
      onSuccess: () => {
        navigate('/users');
      },
    });
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleCancel} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common:actions.back')}
      </Button>

      <PageHeader title={t('createUser')} description={t('subtitle')} />

      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={createUser.isPending} />
    </div>
  );
}
