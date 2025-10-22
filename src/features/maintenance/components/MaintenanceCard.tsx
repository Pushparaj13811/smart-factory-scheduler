// Maintenance Card component for grid view

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreVertical, Eye, Edit, Trash2, Calendar, DollarSign, Wrench, User, AlertCircle } from 'lucide-react';
import type { MaintenanceRecord } from '../types';
import { MaintenanceStatus, MaintenanceType } from '../types';
import { useState } from 'react';
import { useDeleteMaintenance } from '../hooks';
import { format } from 'date-fns';

interface MaintenanceCardProps {
  record: MaintenanceRecord;
}

export function MaintenanceCard({ record }: MaintenanceCardProps) {
  const { t } = useTranslation(['maintenance', 'common']);
  const navigate = useNavigate();
  const deleteMaintenance = useDeleteMaintenance();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleView = () => {
    navigate(`/maintenance/${record.id}`);
  };

  const handleEdit = () => {
    navigate(`/maintenance/${record.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteMaintenance.mutate(record.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  const isOverdue = record.status === MaintenanceStatus.OVERDUE;

  return (
    <>
      <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${isOverdue ? 'border-destructive' : ''}`} onClick={handleView}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{record.machineName || 'Machine'}</CardTitle>
                {isOverdue && <AlertCircle className="h-4 w-4 text-destructive" />}
              </div>
              <CardDescription className="flex items-center gap-1">
                <Wrench className="h-3 w-3" />
                {record.description || t('defaultDescription')}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(); }}>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('common:actions.view')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t('common:actions.edit')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('common:actions.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.status')}</span>
              <Badge variant={getStatusVariant(record.status)}>
                {t(`status.${record.status}`)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.type')}</span>
              <Badge variant={getTypeVariant(record.type)}>
                {t(`type.${record.type}`)}
              </Badge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('form.scheduledDate')}
                </span>
              </div>
              <span className="text-sm font-medium">{format(new Date(record.scheduledDate), 'MMM dd, yyyy')}</span>
            </div>

            {record.technician && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {t('form.technician')}
                  </span>
                </div>
                <span className="text-sm font-medium">{record.technician}</span>
              </div>
            )}

            {record.cost && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {t('form.cost')}
                  </span>
                </div>
                <span className="text-sm font-medium">${record.cost.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmations.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmations.deleteMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMaintenance.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMaintenance.isPending
                ? t('common:states.processing')
                : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
