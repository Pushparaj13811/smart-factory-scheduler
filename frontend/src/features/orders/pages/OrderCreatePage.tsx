// Order Create Page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderForm } from '../components';
import { useCreateOrder } from '../hooks';
import type { CreateOrderInput } from '../types';

export default function OrderCreatePage() {
  const { t } = useTranslation(['orders', 'common']);
  const navigate = useNavigate();
  const createOrder = useCreateOrder();

  const handleSubmit = (data: CreateOrderInput) => {
    createOrder.mutate(data, {
      onSuccess: (order) => {
        navigate(`/orders/${order.id}`);
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('createOrder')}
        description={t('subtitle')}
        backButton={
          <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:actions.back')}
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <OrderForm onSubmit={handleSubmit} isSubmitting={createOrder.isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
