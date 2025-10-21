// Task Table component

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
import { MoreVertical, Eye, Edit, Trash2, Clock, User, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import type { ScheduleTask } from '../types';
import { TaskStatus, TaskPriority } from '../types';
import { useDeleteTask } from '../hooks';

interface TaskTableProps {
  tasks: ScheduleTask[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  const { t } = useTranslation(['schedule', 'common']);
  const navigate = useNavigate();
  const deleteTask = useDeleteTask();
  const [taskToDelete, setTaskToDelete] = useState<ScheduleTask | null>(null);

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
      case TaskPriority.CRITICAL:
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

  const handleView = (taskId: string) => {
    navigate(`/schedule/tasks/${taskId}`);
  };

  const handleEdit = (taskId: string) => {
    navigate(`/schedule/tasks/${taskId}/edit`);
  };

  const handleDelete = (task: ScheduleTask) => {
    setTaskToDelete(task);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask.mutate(taskToDelete.id, {
        onSuccess: () => {
          setTaskToDelete(null);
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
              <TableHead className="text-white">{t('form.title')}</TableHead>
              <TableHead className="text-white">{t('form.machine')}</TableHead>
              <TableHead className="text-white">{t('form.assignedTo')}</TableHead>
              <TableHead className="text-white">{t('form.priority')}</TableHead>
              <TableHead className="text-white">{t('form.status')}</TableHead>
              <TableHead className="text-white">{t('form.startTime')}</TableHead>
              <TableHead className="text-white">{t('form.duration')}</TableHead>
              <TableHead className="text-right text-white">{t('common:actions.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const isDelayed = task.status === TaskStatus.DELAYED ||
                (task.status !== TaskStatus.COMPLETED && new Date(task.endTime) < new Date());
              return (
                <TableRow
                  key={task.id}
                  className={`cursor-pointer ${isDelayed ? 'bg-destructive/5' : ''}`}
                  onClick={() => handleView(task.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      {isDelayed && <AlertTriangle className="h-4 w-4 text-destructive" />}
                      {task.title}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{task.machineName || '-'}</TableCell>
                  <TableCell>
                    {task.assignedToName ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{task.assignedToName}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityVariant(task.priority)}>
                      {t(`priority.${task.priority}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(task.status)}>
                      {t(`status.${task.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(task.startTime), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                  <TableCell>
                    {task.estimatedDuration ? (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{task.estimatedDuration}h</span>
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
                        <DropdownMenuItem onClick={() => handleView(task.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t('common:actions.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('common:actions.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(task)}
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
      <AlertDialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
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
              disabled={deleteTask.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTask.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
