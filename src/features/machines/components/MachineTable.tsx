// Machine Table component

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
import { MoreVertical, Eye, Edit, Trash2, Activity, TrendingUp } from 'lucide-react';
import type { Machine } from '../types';
import { MachineStatus } from '../types';
import { useDeleteMachine } from '../hooks';

interface MachineTableProps {
  machines: Machine[];
}

export function MachineTable({ machines }: MachineTableProps) {
  const { t } = useTranslation(['machines', 'common']);
  const navigate = useNavigate();
  const deleteMachine = useDeleteMachine();
  const [machineToDelete, setMachineToDelete] = useState<Machine | null>(null);

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

  const handleView = (machineId: string) => {
    navigate(`/machines/${machineId}`);
  };

  const handleEdit = (machineId: string) => {
    navigate(`/machines/${machineId}/edit`);
  };

  const handleDelete = (machine: Machine) => {
    setMachineToDelete(machine);
  };

  const confirmDelete = () => {
    if (machineToDelete) {
      deleteMachine.mutate(machineToDelete.id, {
        onSuccess: () => {
          setMachineToDelete(null);
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
              <TableHead className="text-white">{t('form.name')}</TableHead>
              <TableHead className="text-white">{t('form.model')}</TableHead>
              <TableHead className="text-white">{t('form.type')}</TableHead>
              <TableHead className="text-white">{t('form.status')}</TableHead>
              <TableHead className="text-white">{t('form.location')}</TableHead>
              <TableHead className="text-white">{t('details.utilization')}</TableHead>
              <TableHead className="text-white">{t('details.efficiency')}</TableHead>
              <TableHead className="text-right text-white">{t('common:actions.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <TableRow
                key={machine.id}
                className="cursor-pointer"
                onClick={() => handleView(machine.id)}
              >
                <TableCell className="font-medium">{machine.name}</TableCell>
                <TableCell className="text-muted-foreground">{machine.model}</TableCell>
                <TableCell className="text-muted-foreground">{t(`types.${machine.type}`)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(machine.status)}>
                    {t(`status.${machine.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{machine.location || '-'}</TableCell>
                <TableCell>
                  {machine.metrics?.utilization !== undefined ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Activity className="h-3 w-3" />
                      <span>{machine.metrics.utilization.toFixed(0)}%</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {machine.metrics?.efficiency !== undefined ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <span>{machine.metrics.efficiency.toFixed(0)}%</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(machine.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t('common:actions.view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(machine.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('common:actions.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(machine)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('common:actions.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!machineToDelete} onOpenChange={(open) => !open && setMachineToDelete(null)}>
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
              disabled={deleteMachine.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMachine.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
