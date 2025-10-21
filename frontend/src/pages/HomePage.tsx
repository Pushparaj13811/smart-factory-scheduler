// Home page / Dashboard placeholder

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ProgressIndicator } from '@/components/common/ProgressIndicator';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_LABELS } from '@/constants/roles';
import type { UserRole } from '@/constants/roles';
import { Users, Cog, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useTranslation('dashboard');

  return (
    <div className="container mx-auto p-6">
      <PageHeader
        title={t('welcome.title', { name: user?.name || 'User' })}
        description={t('welcome.description')}
      />

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('stats.totalMachines')}
          value="12"
          icon={<Cog className="h-4 w-4" />}
          trend={{ value: 8.2, label: t('stats.fromLastMonth') }}
          description={t('stats.totalMachinesDesc')}
        />
        <StatCard
          title={t('stats.components')}
          value="48"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 12.5, label: t('stats.fromLastMonth') }}
          description={t('stats.componentsDesc')}
        />
        <StatCard
          title={t('stats.activeOrders')}
          value="23"
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{ value: -3.1, label: t('stats.fromLastWeek') }}
          description={t('stats.activeOrdersDesc')}
        />
        <StatCard
          title={t('stats.efficiency')}
          value="94%"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 2.3, label: t('stats.fromLastWeek') }}
          description={t('stats.efficiencyDesc')}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* User Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('userInfo.title')}
            </CardTitle>
            <CardDescription>{t('userInfo.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('userInfo.name')}</p>
              <p className="text-sm font-semibold">{user?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('userInfo.email')}</p>
              <p className="text-sm font-semibold">{user?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('userInfo.role')}</p>
              <p className="text-sm font-semibold">
                {user?.role ? ROLE_LABELS[user.role as UserRole] : 'N/A'}
              </p>
            </div>
            {user?.industryId && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('userInfo.industryId')}</p>
                <p className="text-sm font-mono text-xs">{user.industryId}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Implementation Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('progress.title')}</CardTitle>
            <CardDescription>{t('progress.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressIndicator
              value={100}
              label={t('progress.phase0')}
              variant="success"
              size="sm"
            />
            <ProgressIndicator
              value={100}
              label={t('progress.phase1')}
              variant="success"
              size="sm"
            />
            <ProgressIndicator
              value={100}
              label={t('progress.phase2')}
              variant="success"
              size="sm"
            />
            <ProgressIndicator
              value={85}
              label={t('progress.phase3')}
              variant="warning"
              size="sm"
            />
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions.title')}</CardTitle>
            <CardDescription>{t('quickActions.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('quickActions.comingSoon')}
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>{t('quickActions.phase4')}</li>
              <li>{t('quickActions.phase5')}</li>
              <li>{t('quickActions.phase9')}</li>
              <li>{t('quickActions.phase10')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Dev info */}
      <Card className="mt-6 border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">{t('devInfo.title')}</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          <p>{t('devInfo.mockAuth')}</p>
          <p className="mt-2">
            <strong>{t('devInfo.testUsers')}</strong>
          </p>
          <ul className="mt-1 list-inside list-disc space-y-1">
            <li>admin@system.com - {t('devInfo.systemAdmin')}</li>
            <li>owner@factory1.com - {t('devInfo.industryOwner')}</li>
            <li>admin@factory1.com - {t('devInfo.administrator')}</li>
            <li>supervisor@factory1.com - {t('devInfo.supervisor')}</li>
            <li>worker@factory1.com - {t('devInfo.worker')}</li>
          </ul>
          <p className="mt-2">{t('devInfo.allPasswords')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
