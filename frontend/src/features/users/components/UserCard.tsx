// User Card component for grid view

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { MoreVertical, Eye, Edit, Trash2, Mail, Building2 } from 'lucide-react';
import type { User } from '@/types/auth.types';
import { ROLE_LABELS } from '@/constants/roles';
import { useState } from 'react';
import { useDeleteUser } from '../hooks';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { t } = useTranslation(['users', 'common']);
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleView = () => {
    navigate(`/users/${user.id}`);
  };

  const handleEdit = () => {
    navigate(`/users/${user.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteUser.mutate(user.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleView}>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView();
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {t('common:actions.view')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                      }}
                    >
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.role')}</span>
              <Badge variant="outline">{ROLE_LABELS[user.role]}</Badge>
            </div>

            {user.industryId && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {t('form.industry')}
                </span>
                <span className="text-sm font-medium">{user.industryId}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">{t('details.joinedOn')}</span>
              <span className="text-sm font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmations.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('confirmations.deleteMessage', { name: user.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteUser.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteUser.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
