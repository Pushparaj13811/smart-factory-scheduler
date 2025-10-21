// Order Details component

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Order } from '../types';
import { Building2, Mail, Phone } from 'lucide-react';

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const { t } = useTranslation(['orders']);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('details.customerInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">{order.customer.company || order.customer.name}</div>
              {order.customer.company && (
                <div className="text-sm text-muted-foreground">{order.customer.name}</div>
              )}
            </div>
          </div>
          {order.customer.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{order.customer.email}</span>
            </div>
          )}
          {order.customer.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{order.customer.phone}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('details.orderItems')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="font-medium">{item.componentName}</div>
                  <div className="text-sm text-muted-foreground">{item.componentCode}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{item.quantity} x ${Number(item.unitPrice).toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">${Number(item.totalPrice || 0).toFixed(2)}</div>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between pt-2 font-semibold">
              <span>{t('form.totalAmount')}</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle>{t('form.notes')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{order.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
