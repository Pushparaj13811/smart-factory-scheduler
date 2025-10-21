// Schedule Summary component for dashboard

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { useScheduleSummary } from '../hooks/useScheduleSummary';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import type { ScheduleTask } from '../types';

const statusColors = {
  scheduled: 'bg-blue-500',
  in_progress: 'bg-green-500',
  completed: 'bg-gray-500',
  overdue: 'bg-red-500',
};

const priorityColors = {
  low: 'border-gray-300',
  medium: 'border-yellow-500',
  high: 'border-red-500',
};

export function ScheduleSummary() {
  const { t, i18n } = useTranslation('dashboard');
  const { data: tasks, isLoading, isError, refetch } = useScheduleSummary();

  const locale = i18n.language === 'hi' ? hi : enUS;

  const formatTime = (time: string) => {
    return format(new Date(time), 'HH:mm', { locale });
  };

  const getStatusBadge = (status: ScheduleTask['status']) => {
    const statusKey = status === 'in_progress' ? 'inProgress' : status;
    return (
      <div className="flex items-center gap-1">
        <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
        <span className="text-xs capitalize">{t(`common:status.${statusKey}`)}</span>
      </div>
    );
  };

  const todayTasks = tasks?.filter(
    (task) => new Date(task.startTime).toDateString() === new Date().toDateString()
  );
  const upcomingTasks = tasks?.filter(
    (task) => new Date(task.startTime) > new Date() && task.status !== 'overdue'
  );
  const overdueTasks = tasks?.filter((task) => task.status === 'overdue');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('scheduleSummary.title')}</CardTitle>
            <CardDescription>{t('scheduleSummary.description')}</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            {t('scheduleSummary.viewSchedule')}
            <ArrowRight className="ml-2 h-4 w-4" />
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

        {!isLoading && !isError && (!tasks || tasks.length === 0) && (
          <EmptyState title={t('scheduleSummary.noTasks')} icon={<Calendar className="h-12 w-12" />} />
        )}

        {!isLoading && !isError && tasks && tasks.length > 0 && (
          <div className="space-y-4">
            {/* Summary counts */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{todayTasks?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{t('scheduleSummary.todayTasks')}</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{upcomingTasks?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{t('scheduleSummary.upcomingTasks')}</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-red-600">{overdueTasks?.length || 0}</div>
                <div className="text-xs text-muted-foreground">{t('scheduleSummary.overdueTasks')}</div>
              </div>
            </div>

            {/* Task list */}
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {tasks.slice(0, 10).map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg border-l-4 ${priorityColors[task.priority]} border bg-card p-3 transition-colors hover:bg-muted/50`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground">{task.description}</p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(task.startTime)} - {formatTime(task.endTime)}
                          </div>
                          {task.machineName && (
                            <span>• {task.machineName}</span>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(task.status)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
