// Maintenance Table component

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { MoreVertical, Eye, Edit, Trash2, AlertCircle, Wrench } from 'lucide-react';
import { format } from 'date-fns';
import type { MaintenanceRecord } from '../types';
import { MaintenanceStatus, MaintenanceType } from '../types';
import { useDeleteMaintenance } from '../hooks';

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
}

export function MaintenanceTable({ records }: MaintenanceTableProps) {
  const { t } = useTranslation(['maintenance', 'common']);
  const navigate = useNavigate();
  const deleteMaintenance = useDeleteMaintenance();
  const [recordToDelete, setRecordToDelete] = useState<MaintenanceRecord | null>(null);

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

  const handleView = (recordId: string) => {
    navigate(`/maintenance/${recordId}`);
  };

  const handleEdit = (recordId: string) => {
    navigate(`/maintenance/${recordId}/edit`);
  };

  const handleDelete = (record: MaintenanceRecord) => {
    setRecordToDelete(record);
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      deleteMaintenance.mutate(recordToDelete.id, {
        onSuccess: () => {
          setRecordToDelete(null);
        },
      });
    }
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table className="table-striped">
          <TableHeader>
            <TableRow className="table-header-gradient hover:bg-transparent">
              <TableHead className="text-white">{t('form.machine')}</TableHead>
              <TableHead className="text-white">{t('form.description')}</TableHead>
              <TableHead className="text-white">{t('form.type')}</TableHead>
              <TableHead className="text-white">{t('form.status')}</TableHead>
              <TableHead className="text-white">{t('form.scheduledDate')}</TableHead>
              <TableHead className="text-white">{t('form.technician')}</TableHead>
              <TableHead className="text-white">{t('form.cost')}</TableHead>
              <TableHead className="text-right text-white">{t('common:actions.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => {
              const isOverdue = record.status === MaintenanceStatus.OVERDUE;
              return (
                <TableRow
                  key={record.id}
                  className={`cursor-pointer ${isOverdue ? 'bg-destructive/5' : ''}`}
                  onClick={() => handleView(record.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      {isOverdue && <AlertCircle className="h-4 w-4 text-destructive" />}
                      {record.machineName || 'Machine'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground max-w-xs truncate">
                      <Wrench className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{record.description || t('defaultDescription')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(record.type)}>
                      {t(`type.${record.type}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)}>
                      {t(`status.${record.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(record.scheduledDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.technician || '-'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.cost ? `$${record.cost.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(record.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t('common:actions.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(record.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('common:actions.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(record)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t('common:actions.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!recordToDelete} onOpenChange={(open) => !open && setRecordToDelete(null)}>
        <AlertDialogContent>
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
              {deleteMaintenance.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
