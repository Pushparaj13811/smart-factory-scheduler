// Worker Dashboard

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { ActivityFeed, QuickActions, ScheduleSummary } from '../components';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import { ClipboardList, CheckCircle, Clock } from 'lucide-react';

export function WorkerDashboard() {
  const { t } = useTranslation('dashboard');
  const { data: metrics } = useDashboardMetrics();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('welcome.worker')}
        description={t('welcome.description')}
      />

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title={t('stats.assignedTasks')}
          value={metrics?.assignedTasks?.toString() || '0'}
          description={t('stats.assignedTasksDesc')}
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />

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
          title={t('stats.efficiency')}
          value={metrics?.efficiency ? `${metrics.efficiency}%` : '0%'}
          description={t('stats.efficiencyDesc')}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
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
