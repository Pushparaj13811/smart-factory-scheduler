// Machine Card component for grid view

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
import { MoreVertical, Eye, Edit, Trash2, Activity, TrendingUp } from 'lucide-react';
import type { Machine } from '../types';
import { MachineStatus } from '../types';
import { useState } from 'react';
import { useDeleteMachine } from '../hooks';

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  const { t } = useTranslation(['machines', 'common']);
  const navigate = useNavigate();
  const deleteMachine = useDeleteMachine();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleView = () => {
    navigate(`/machines/${machine.id}`);
  };

  const handleEdit = () => {
    navigate(`/machines/${machine.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteMachine.mutate(machine.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleView}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg">{machine.name}</CardTitle>
              <CardDescription>{machine.model}</CardDescription>
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
              <Badge variant={getStatusVariant(machine.status)}>
                {t(`status.${machine.status}`)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.type')}</span>
              <span className="text-sm font-medium">{t(`types.${machine.type}`)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.location')}</span>
              <span className="text-sm font-medium">{machine.location}</span>
            </div>

            {machine.metrics && (
              <>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t('details.utilization')}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{machine.metrics.utilization}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t('details.efficiency')}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{machine.metrics.efficiency}%</span>
                </div>
              </>
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
              disabled={deleteMachine.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMachine.isPending
                ? t('common:states.processing')
                : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
