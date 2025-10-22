// Order Timeline component

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';
import type { Order } from '../types';

interface OrderTimelineProps {
  order: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const { t } = useTranslation(['orders']);

  const events = [
    {
      type: 'created',
      title: t('timeline.orderCreated'),
      timestamp: order.createdAt,
      icon: Clock,
    },
    ...(order.startDate ? [{
      type: 'started',
      title: t('timeline.orderStarted'),
      timestamp: order.startDate,
      icon: Clock,
    }] : []),
    ...(order.completedDate ? [{
      type: 'completed',
      title: t('timeline.orderCompleted'),
      timestamp: order.completedDate,
      icon: CheckCircle2,
    }] : []),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('details.timeline')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <Icon className="h-5 w-5 text-primary" />
                  {index < events.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
