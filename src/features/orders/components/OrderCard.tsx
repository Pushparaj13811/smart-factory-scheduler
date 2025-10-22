// Order Card component for grid view

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreVertical, Eye, Edit, Trash2, Calendar, DollarSign, Package, Building2 } from 'lucide-react';
import type { Order } from '../types';
import { OrderStatus, OrderPriority } from '../types';
import { useState } from 'react';
import { useDeleteOrder } from '../hooks';
import { format } from 'date-fns';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const { t } = useTranslation(['orders', 'common']);
  const navigate = useNavigate();
  const deleteOrder = useDeleteOrder();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getStatusVariant = (status: OrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return 'default';
      case OrderStatus.IN_PROGRESS:
        return 'secondary';
      case OrderStatus.ON_HOLD:
      case OrderStatus.CANCELLED:
        return 'destructive';
      case OrderStatus.PENDING:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getPriorityVariant = (priority: OrderPriority): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (priority) {
      case OrderPriority.URGENT:
        return 'destructive';
      case OrderPriority.HIGH:
        return 'default';
      case OrderPriority.MEDIUM:
        return 'secondary';
      case OrderPriority.LOW:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleView = () => {
    navigate(`/orders/${order.id}`);
  };

  const handleEdit = () => {
    navigate(`/orders/${order.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteOrder.mutate(order.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleView}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {order.customer.company || order.customer.name}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(); }}>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('common:actions.view')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t('common:actions.edit')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('common:actions.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.status')}</span>
              <Badge variant={getStatusVariant(order.status)}>
                {t(`status.${order.status}`)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.priority')}</span>
              <Badge variant={getPriorityVariant(order.priority)}>
                {t(`priority.${order.priority}`)}
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('form.dueDate')}
                </span>
              </div>
              <span className="text-sm font-medium">{format(new Date(order.dueDate), 'MMM dd, yyyy')}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('form.totalQuantity')}
                </span>
              </div>
              <span className="text-sm font-medium">{order.totalQuantity} items</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('form.totalAmount')}
                </span>
              </div>
              <span className="text-sm font-medium">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmations.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmations.deleteMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteOrder.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteOrder.isPending
                ? t('common:states.processing')
                : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
