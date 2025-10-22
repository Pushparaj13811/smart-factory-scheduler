// Order Details Page

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrderDetails, OrderTimeline } from '../components';
import { useOrder, useDeleteOrder } from '../hooks';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function OrderDetailsPage() {
  const { t } = useTranslation(['orders', 'common']);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id!);
  const deleteOrder = useDeleteOrder();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    if (id) {
      deleteOrder.mutate(id, {
        onSuccess: () => {
          navigate('/orders');
        },
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!order) return <div>{t('common:errors.notFound')}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={order.orderNumber}
        description={order.customer.company || order.customer.name}
        backButton={
          <Button variant="ghost" size="sm" onClick={() => navigate('/orders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common:actions.back')}
          </Button>
        }
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/orders/${id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              {t('common:actions.edit')}
            </Button>
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              {t('common:actions.delete')}
            </Button>
          </div>
        }
      />

      <div className="flex gap-2">
        <Badge>{t(`status.${order.status}`)}</Badge>
        <Badge variant="outline">{t(`priority.${order.priority}`)}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderDetails order={order} />
        </div>
        <div>
          <OrderTimeline order={order} />
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmations.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmations.deleteMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleteOrder.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
