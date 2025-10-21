// Subscriptions management page

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Search, CreditCard, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useSubscriptions, useRenewSubscription } from '../hooks';
import { SubscriptionStatus } from '../types';
import type { Subscription } from '../types';
import { formatDate } from 'date-fns';

export default function SubscriptionsPage() {
  const { t } = useTranslation(['system', 'common']);
  const [page] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, refetch } = useSubscriptions(page, 20);
  const renewSubscription = useRenewSubscription();

  const getStatusColor = (status: string) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'default';
      case SubscriptionStatus.TRIAL:
        return 'secondary';
      case SubscriptionStatus.EXPIRED:
      case SubscriptionStatus.CANCELLED:
        return 'destructive';
      case SubscriptionStatus.PAYMENT_PENDING:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const filteredSubscriptions = data?.subscriptions.filter(
    (sub) =>
      sub.industryName.toLowerCase().includes(search.toLowerCase()) ||
      sub.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = data?.subscriptions.reduce((sum, sub) => sum + sub.price, 0) || 0;
  const activeCount = data?.subscriptions.filter((s) => s.status === SubscriptionStatus.ACTIVE).length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('subscriptions.title')}</h1>
        <p className="text-muted-foreground">{t('subscriptions.subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('subscriptions.totalSubscriptions')}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('subscriptions.activeSubscriptions')}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('subscriptions.revenue')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('subscriptions.title')}</CardTitle>
              <CardDescription>{data?.total} {t('common:pagination.totalItems')}</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('common:actions.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <LoadingState />}
          {isError && <ErrorState retry={refetch} />}
          {!isLoading && !isError && filteredSubscriptions && (
            <div className="space-y-4">
              {filteredSubscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{subscription.industryName}</h3>
                          <Badge variant={getStatusColor(subscription.status)}>
                            {t(`subscriptions.status.${subscription.status}`)}
                          </Badge>
                          <Badge variant="outline">{t(`subscriptions.plans.${subscription.plan}`)}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">{t('subscriptions.price')}</p>
                            <p className="font-medium">
                              ${subscription.price}/{t(`subscriptions.billingCycles.${subscription.billingCycle}`)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t('subscriptions.currentUsers')}</p>
                            <p className="font-medium">
                              {subscription.currentUsers} / {subscription.maxUsers}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t('subscriptions.currentMachines')}</p>
                            <p className="font-medium">
                              {subscription.currentMachines} / {subscription.maxMachines}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">{t('subscriptions.currentStorage')}</p>
                            <p className="font-medium">
                              {subscription.currentStorage} / {subscription.maxStorage} GB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            {t('subscriptions.startDate')}: {formatDate(subscription.startDate, 'PPP')}
                          </span>
                          <span>
                            {t('subscriptions.endDate')}: {formatDate(subscription.endDate, 'PPP')}
                          </span>
                          <span className="flex items-center gap-1">
                            {subscription.autoRenew ? (
                              <><CheckCircle className="h-3 w-3 text-green-600" /> {t('subscriptions.autoRenew')}</>
                            ) : (
                              <><XCircle className="h-3 w-3 text-muted-foreground" /> Manual</>
                            )}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => renewSubscription.mutate(subscription.id)}
                        disabled={renewSubscription.isPending}
                      >
                        {t('subscriptions.actions.renew')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredSubscriptions.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  {t('subscriptions.noSubscriptions')}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
