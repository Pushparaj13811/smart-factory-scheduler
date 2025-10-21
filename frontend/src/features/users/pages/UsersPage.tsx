// User Management page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { UserList } from '../components';

export default function UsersPage() {
  const { t } = useTranslation(['users', 'common']);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button type="button" onClick={() => navigate('/users/create')}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addUser')}
          </Button>
        }
      />

      <UserList />
    </div>
  );
}
