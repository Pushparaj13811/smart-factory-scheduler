// Supervisor Dashboard

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ActivityFeed, QuickActions, ScheduleSummary } from '../components';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { CheckCircle, AlertCircle, TrendingUp, Users } from 'lucide-react';

export function SupervisorDashboard() {
  const { t } = useTranslation('dashboard');
  const { data: metrics } = useDashboardMetrics();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('welcome.supervisor')}
        description={t('welcome.description')}
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t('stats.completedTasks')}
          value={metrics?.completedTasks?.toString() || '0'}
          description={t('stats.completedTasksDesc')}
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          trend={
            metrics?.trends?.tasksTrend
              ? {
                  value: metrics.trends.tasksTrend,
                  label: t('stats.fromLastWeek'),
                }
              : undefined
          }
        />

        <StatCard
          title={t('stats.activeOrders')}
          value={metrics?.activeOrders?.toString() || '0'}
          description={t('stats.activeOrdersDesc')}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />

        <StatCard
          title={t('stats.pendingMaintenance')}
          value={metrics?.pendingMaintenance?.toString() || '0'}
          description={t('stats.pendingMaintenanceDesc')}
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
        />

        <StatCard
          title={t('stats.workloadUtilization')}
          value={metrics?.workloadUtilization ? `${metrics.workloadUtilization}%` : '0%'}
          description={t('stats.workloadUtilizationDesc')}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-2">
          <ScheduleSummary />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
