// Machine Details component with status and maintenance info

import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Activity,
  TrendingUp,
  Clock,
  Calendar,
  MapPin,
  Settings,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import type { Machine } from '../types';
import { MachineStatus, MaintenanceStatus } from '../types';
import { useMaintenanceHistory } from '../hooks';

interface MachineDetailsProps {
  machine: Machine;
  onEdit?: () => void;
}

export function MachineDetails({ machine, onEdit }: MachineDetailsProps) {
  const { t, i18n } = useTranslation(['machines', 'common']);
  const { data: maintenanceHistory } = useMaintenanceHistory(machine.id);

  const getStatusVariant = (status: MachineStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case MachineStatus.RUNNING:
        return 'default';
      case MachineStatus.IDLE:
        return 'secondary';
      case MachineStatus.MAINTENANCE:
        return 'outline';
      case MachineStatus.OFFLINE:
      case MachineStatus.ERROR:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const locale = i18n.language === 'hi' ? hi : enUS;
    return format(new Date(dateString), 'PP', { locale });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">{machine.name}</h2>
          <p className="text-muted-foreground">{machine.model}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={getStatusVariant(machine.status)}>
            {t(`status.${machine.status}`)}
          </Badge>
          {onEdit && (
            <Button onClick={onEdit}>
              {t('common:actions.edit')}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('details.overview')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('form.manufacturer')}</p>
                <p className="font-medium">{machine.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('form.type')}</p>
                <p className="font-medium">{t(`types.${machine.type}`)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('form.capacity')}</p>
                <p className="font-medium">{machine.capacity} units/hour</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('form.location')}</p>
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {machine.location}
                </p>
              </div>
            </div>

            {machine.description && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('form.description')}</p>
                  <p className="text-sm">{machine.description}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>{t('details.performance')}</CardTitle>
          </CardHeader>
          <CardContent>
            {machine.metrics ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t('details.utilization')}</span>
                  </div>
                  <span className="text-2xl font-bold">{machine.metrics.utilization}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{t('details.efficiency')}</span>
                  </div>
                  <span className="text-2xl font-bold">{machine.metrics.efficiency}%</span>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('details.totalRuntime')}</p>
                    <p className="font-medium">{machine.metrics.totalRuntime}h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('details.totalDowntime')}</p>
                    <p className="font-medium">{machine.metrics.totalDowntime}h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('details.productionCount')}</p>
                    <p className="font-medium">{machine.metrics.productionCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('details.averageUptime')}</p>
                    <p className="font-medium">{machine.metrics.averageUptime}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">{t('common:states.noData')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Purchase & Warranty Info */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase & Warranty Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {t('form.purchaseDate')}
              </p>
              <p className="font-medium">{formatDate(machine.purchaseDate)}</p>
            </div>
            {machine.installationDate && (
              <div>
                <p className="text-sm text-muted-foreground">{t('form.installationDate')}</p>
                <p className="font-medium">{formatDate(machine.installationDate)}</p>
              </div>
            )}
            {machine.warrantyExpiry && (
              <div>
                <p className="text-sm text-muted-foreground">{t('form.warrantyExpiry')}</p>
                <p className="font-medium">{formatDate(machine.warrantyExpiry)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Specifications */}
      {machine.specifications && Object.keys(machine.specifications).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('details.specifications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(machine.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Maintenance History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('maintenance.maintenanceHistory')}</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              {t('maintenance.scheduleMaintenance')}
            </Button>
          </div>
          <CardDescription>
            {machine.lastMaintenanceDate && (
              <span className="flex items-center gap-1">
                {t('maintenance.lastMaintenance')}: {formatDate(machine.lastMaintenanceDate)}
              </span>
            )}
            {machine.nextMaintenanceDate && (
              <span className="flex items-center gap-1">
                {t('maintenance.nextMaintenance')}: {formatDate(machine.nextMaintenanceDate)}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {maintenanceHistory && maintenanceHistory.length > 0 ? (
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {maintenanceHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-start gap-3 border-l-2 pl-4 pb-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {record.status === MaintenanceStatus.COMPLETED ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : record.status === MaintenanceStatus.IN_PROGRESS ? (
                        <Clock className="h-5 w-5 text-blue-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{record.description}</p>
                        <Badge variant="outline">
                          {t(`maintenance.${record.type}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(record.scheduledDate)}
                        {record.completedDate && ` - ${formatDate(record.completedDate)}`}
                      </p>
                      {record.performedBy && (
                        <p className="text-sm text-muted-foreground">
                          By: {record.performedBy}
                        </p>
                      )}
                      {record.notes && (
                        <p className="text-sm">{record.notes}</p>
                      )}
                      {record.cost && (
                        <p className="text-sm font-medium">Cost: ${record.cost}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground text-sm">{t('maintenance.noHistory')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
