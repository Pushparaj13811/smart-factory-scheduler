// Activity Feed component for dashboard

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { useRecentActivity } from '../hooks/useRecentActivity';
import {
  Package,
  Wrench,
  CheckCircle,
  Users,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import type { ActivityItem } from '../types';

const activityIcons = {
  order: Package,
  machine: Wrench,
  task: CheckCircle,
  maintenance: AlertCircle,
  user: Users,
  system: Settings,
};

export function ActivityFeed() {
  const { t, i18n } = useTranslation('dashboard');
  const { data: activities, isLoading, isError, refetch } = useRecentActivity();

  const getRelativeTime = (timestamp: string) => {
    const locale = i18n.language === 'hi' ? hi : enUS;
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale });
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    const Icon = activityIcons[type] || Settings;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('activityFeed.title')}</CardTitle>
            <CardDescription>{t('activityFeed.description')}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => refetch()}>
            {t('activityFeed.viewAll')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <LoadingState />}

        {isError && (
          <ErrorState
            title={t('common:states.error')}
            message={t('common:states.errorMessage')}
            retry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (!activities || activities.length === 0) && (
          <EmptyState title={t('activityFeed.noActivity')} />
        )}

        {!isLoading && !isError && activities && activities.length > 0 && (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {activities.map((activity: ActivityItem) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {getRelativeTime(activity.timestamp)}
                      {activity.user && ` • ${activity.user.name}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
