// Maintenance Details component

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MaintenanceRecord } from '../types';
import { MaintenanceStatus, MaintenanceType } from '../types';
import { format } from 'date-fns';
import { Calendar, DollarSign, User, Wrench, FileText } from 'lucide-react';

interface MaintenanceDetailsProps {
  record: MaintenanceRecord;
}

export function MaintenanceDetails({ record }: MaintenanceDetailsProps) {
  const { t } = useTranslation(['maintenance', 'common']);

  const getStatusVariant = (status: MaintenanceStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case MaintenanceStatus.COMPLETED:
        return 'default';
      case MaintenanceStatus.IN_PROGRESS:
        return 'secondary';
      case MaintenanceStatus.OVERDUE:
        return 'destructive';
      case MaintenanceStatus.CANCELLED:
        return 'outline';
      case MaintenanceStatus.SCHEDULED:
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getTypeVariant = (type: MaintenanceType): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (type) {
      case MaintenanceType.EMERGENCY:
        return 'destructive';
      case MaintenanceType.CORRECTIVE:
        return 'default';
      case MaintenanceType.PREVENTIVE:
        return 'secondary';
      case MaintenanceType.ROUTINE:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('details.title')}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusVariant(record.status)}>
              {t(`status.${record.status}`)}
            </Badge>
            <Badge variant={getTypeVariant(record.type)}>
              {t(`type.${record.type}`)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Wrench className="h-4 w-4" />
              {t('form.machine')}
            </div>
            <p className="font-medium">{record.machineName || record.machineId}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              {t('form.scheduledDate')}
            </div>
            <p className="font-medium">{format(new Date(record.scheduledDate), 'PPP')}</p>
          </div>

          {record.completedDate && (
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                {t('form.completedDate')}
              </div>
              <p className="font-medium">{format(new Date(record.completedDate), 'PPP')}</p>
            </div>
          )}

          {record.technician && (
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <User className="h-4 w-4" />
                {t('form.technician')}
              </div>
              <p className="font-medium">{record.technician}</p>
            </div>
          )}

          {record.cost && (
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                {t('form.cost')}
              </div>
              <p className="font-medium">${record.cost.toFixed(2)}</p>
            </div>
          )}
        </div>

        {record.description && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              {t('form.description')}
            </div>
            <p className="text-sm">{record.description}</p>
          </div>
        )}

        {record.notes && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              {t('form.notes')}
            </div>
            <p className="text-sm">{record.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
