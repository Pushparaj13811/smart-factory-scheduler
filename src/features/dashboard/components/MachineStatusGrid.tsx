// Machine Status Grid component for dashboard

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { StatusBadge } from '@/components/common/StatusBadge';
import { useMachineStatus } from '../hooks/useMachineStatus';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Wrench, Play, Pause, WrenchIcon, PowerOff } from 'lucide-react';

const STATUS_COLORS = {
  running: '#10b981', // green
  idle: '#f59e0b', // amber
  maintenance: '#3b82f6', // blue
  offline: '#ef4444', // red
};

export function MachineStatusGrid() {
  const { t } = useTranslation('dashboard');
  const { data: status, isLoading, isError, refetch } = useMachineStatus();

  const chartData = status
    ? [
        { name: t('machineStatus.running'), value: status.running, color: STATUS_COLORS.running },
        { name: t('machineStatus.idle'), value: status.idle, color: STATUS_COLORS.idle },
        { name: t('machineStatus.maintenance'), value: status.maintenance, color: STATUS_COLORS.maintenance },
        { name: t('machineStatus.offline'), value: status.offline, color: STATUS_COLORS.offline },
      ]
    : [];

  const getStatusIcon = (status: string) => {
    const icons = {
      running: Play,
      idle: Pause,
      maintenance: WrenchIcon,
      offline: PowerOff,
    };
    const Icon = icons[status as keyof typeof icons] || Wrench;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('machineStatus.title')}</CardTitle>
        <CardDescription>{t('machineStatus.description')}</CardDescription>
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

        {!isLoading && !isError && (!status || status.total === 0) && (
          <EmptyState title={t('machineStatus.noMachines')} icon={<Wrench className="h-12 w-12" />} />
        )}

        {!isLoading && !isError && status && status.total > 0 && (
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Status Summary Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <Play className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{status.running}</div>
                  <div className="text-xs text-muted-foreground">{t('machineStatus.running')}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                  <Pause className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{status.idle}</div>
                  <div className="text-xs text-muted-foreground">{t('machineStatus.idle')}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <WrenchIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{status.maintenance}</div>
                  <div className="text-xs text-muted-foreground">{t('machineStatus.maintenance')}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border p-3">
                <div className="rounded-full bg-red-100 p-2 text-red-600">
                  <PowerOff className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{status.offline}</div>
                  <div className="text-xs text-muted-foreground">{t('machineStatus.offline')}</div>
                </div>
              </div>
            </div>

            {/* Machine Details */}
            {status.details && status.details.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{t('common:labels.details')}</h4>
                <div className="space-y-2">
                  {status.details.slice(0, 5).map((machine) => (
                    <div
                      key={machine.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-muted-foreground">{getStatusIcon(machine.status)}</div>
                        <div>
                          <p className="text-sm font-medium">{machine.name}</p>
                          {machine.currentTask && (
                            <p className="text-xs text-muted-foreground">{machine.currentTask}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {machine.efficiency !== undefined && (
                          <div className="text-right">
                            <div className="text-sm font-medium">{machine.efficiency}%</div>
                            <div className="text-xs text-muted-foreground">{t('stats.efficiency')}</div>
                          </div>
                        )}
                        <StatusBadge status={machine.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
