// Task Card component for schedule grid view

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
import { MoreVertical, Eye, Edit, Trash2, Clock, User, AlertTriangle } from 'lucide-react';
import type { ScheduleTask } from '../types';
import { TaskStatus, TaskPriority } from '../types';
import { useState } from 'react';
import { useDeleteTask } from '../hooks';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: ScheduleTask;
}

export function TaskCard({ task }: TaskCardProps) {
  const { t } = useTranslation(['schedule', 'common']);
  const navigate = useNavigate();
  const deleteTask = useDeleteTask();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getStatusVariant = (status: typeof TaskStatus[keyof typeof TaskStatus]): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'default';
      case TaskStatus.IN_PROGRESS:
        return 'secondary';
      case TaskStatus.DELAYED:
        return 'destructive';
      case TaskStatus.CANCELLED:
        return 'outline';
      case TaskStatus.SCHEDULED:
      default:
        return 'secondary';
    }
  };

  const getPriorityVariant = (priority: typeof TaskPriority[keyof typeof TaskPriority]): 'default' | 'secondary' | 'destructive' => {
    switch (priority) {
      case TaskPriority.URGENT:
        return 'destructive';
      case TaskPriority.HIGH:
        return 'destructive';
      case TaskPriority.MEDIUM:
        return 'default';
      case TaskPriority.LOW:
      default:
        return 'secondary';
    }
  };

  const handleView = () => {
    navigate(`/schedule/tasks/${task.id}`);
  };

  const handleEdit = () => {
    navigate(`/schedule/tasks/${task.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  const isDelayed = task.status === TaskStatus.DELAYED ||
    (task.status !== TaskStatus.COMPLETED && new Date(task.endTime) < new Date());

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleView}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
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
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getStatusVariant(task.status)}>
                {t(`status.${task.status}`)}
              </Badge>
              <Badge variant={getPriorityVariant(task.priority)}>
                {t(`priority.${task.priority}`)}
              </Badge>
              {isDelayed && task.status !== TaskStatus.DELAYED && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {t('status.delayed')}
                </Badge>
              )}
            </div>

            {task.machineName && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('form.machine')}</span>
                <span className="text-sm font-medium">{task.machineName}</span>
              </div>
            )}

            {task.assignedToName && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t('form.assignedTo')}</span>
                </div>
                <span className="text-sm font-medium">{task.assignedToName}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('form.startTime')}</span>
              </div>
              <span className="text-sm font-medium">
                {formatDistanceToNow(new Date(task.startTime), { addSuffix: true })}
              </span>
            </div>

            {task.estimatedDuration && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('form.duration')}</span>
                <span className="text-sm font-medium">{task.estimatedDuration} {t('common:time.minutes')}</span>
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
              disabled={deleteTask.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTask.isPending
                ? t('common:states.processing')
                : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
