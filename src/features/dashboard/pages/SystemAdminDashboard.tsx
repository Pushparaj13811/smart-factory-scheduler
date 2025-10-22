// System Administrator Dashboard

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ActivityFeed, QuickActions } from '../components';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { Building2, Users, TrendingUp, Server } from 'lucide-react';

export function SystemAdminDashboard() {
  const { t } = useTranslation('dashboard');
  const { data: metrics } = useDashboardMetrics();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('welcome.systemAdmin')}
        description={t('welcome.description')}
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('stats.totalIndustries')}
          value={metrics?.totalIndustries?.toString() || '0'}
          description={t('stats.totalIndustriesDesc')}
          icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          trend={
            metrics?.trends?.machinesTrend
              ? {
                  value: metrics.trends.machinesTrend,
                  label: t('stats.fromLastMonth'),
                }
              : undefined
          }
        />

        <StatCard
          title={t('stats.totalUsers')}
          value={metrics?.totalUsers?.toString() || '0'}
          description={t('stats.totalUsersDesc')}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={
            metrics?.trends?.ordersTrend
              ? {
                  value: metrics.trends.ordersTrend,
                  label: t('stats.fromLastMonth'),
                }
              : undefined
          }
        />

        <StatCard
          title={t('stats.systemUptime')}
          value={metrics?.systemUptime ? `${metrics.systemUptime}%` : '99.9%'}
          description={t('stats.systemUptimeDesc')}
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
        />

        <StatCard
          title={t('stats.efficiency')}
          value={metrics?.efficiency ? `${metrics.efficiency}%` : '0%'}
          description={t('stats.efficiencyDesc')}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend={
            metrics?.trends?.efficiencyTrend
              ? {
                  value: metrics.trends.efficiencyTrend,
                  label: t('stats.fromLastMonth'),
                }
              : undefined
          }
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <ActivityFeed />
      </div>
    </div>
  );
}
