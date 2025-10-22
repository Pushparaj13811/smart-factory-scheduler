// Order Edit Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderForm } from '../components';
import { useOrder, useUpdateOrder } from '../hooks';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import type { UpdateOrderInput } from '../types';

export default function OrderEditPage() {
  const { t } = useTranslation(['orders', 'common']);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id!);
  const updateOrder = useUpdateOrder();

  const handleSubmit = (data: UpdateOrderInput) => {
    if (id) {
      updateOrder.mutate({ id, data }, {
        onSuccess: (order) => {
          navigate(`/orders/${order.id}`);
        },
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!order) return <div>{t('common:errors.notFound')}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('editOrder')}
        description={order.orderNumber}
        backButton={
          <Button variant="ghost" size="sm" onClick={() => navigate(`/orders/${id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:actions.back')}
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <OrderForm order={order} onSubmit={handleSubmit} isSubmitting={updateOrder.isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
