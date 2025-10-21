// Orders List Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { OrderList } from '../components';
import { useOrders } from '../hooks';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function OrdersPage() {
  const { t } = useTranslation(['orders', 'common']);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useOrders(page, 10);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button onClick={() => navigate('/orders/create')}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addOrder')}
          </Button>
        }
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : data?.orders ? (
        <OrderList orders={data.orders} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noOrders')}</p>
        </div>
      )}
    </div>
  );
}
