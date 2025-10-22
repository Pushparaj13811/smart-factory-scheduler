// User Details Page

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Edit, Shield, Ban, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserDetails } from '../components';
import { useUser, useUpdateUserRole, useActivateUser, useDeactivateUser, useDeleteUser } from '../hooks';
import { UserRole, ROLE_LABELS } from '@/constants/roles';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export default function UserDetailsPage() {
  const { t } = useTranslation(['users', 'common']);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useUser(id!);

  const updateRole = useUpdateUserRole();
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();
  const deleteUser = useDeleteUser();

  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showActivateDialog, setShowActivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();

  const handleEdit = () => {
    navigate(`/users/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/users');
  };

  const handleRoleChange = () => {
    setSelectedRole(user?.role as UserRole);
    setShowRoleDialog(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedRole || !user) return;
    try {
      await updateRole.mutateAsync({ id: user.id, role: selectedRole });
      toast.success(t('messages.roleUpdated'));
      setShowRoleDialog(false);
    } catch (error) {
      toast.error(t('messages.roleUpdateError'));
    }
  };

  const handleSuspend = () => {
    setShowSuspendDialog(true);
  };

  const confirmSuspend = async () => {
    if (!user) return;
    try {
      await deactivateUser.mutateAsync(user.id);
      toast.success(t('messages.userSuspended'));
      setShowSuspendDialog(false);
    } catch (error) {
      toast.error(t('messages.suspendError'));
    }
  };

  const handleActivate = () => {
    setShowActivateDialog(true);
  };

  const confirmActivate = async () => {
    if (!user) return;
    try {
      await activateUser.mutateAsync(user.id);
      toast.success(t('messages.userActivated'));
      setShowActivateDialog(false);
    } catch (error) {
      toast.error(t('messages.activateError'));
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!user) return;
    try {
      await deleteUser.mutateAsync(user.id);
      toast.success(t('messages.userDeleted'));
      navigate('/users');
    } catch (error) {
      toast.error(t('messages.deleteError'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive">{t('messages.loadError')}</p>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common:actions.back')}
        </Button>
      </div>
    );
  }

  // Check if user is active (assuming user has a status field, or using a placeholder)
  const isActive = true; // TODO: Update this based on actual user status from backend

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common:actions.back')}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRoleChange}>
            <Shield className="mr-2 h-4 w-4" />
            {t('actions.changeRole')}
          </Button>
          {isActive ? (
            <Button variant="outline" onClick={handleSuspend}>
              <Ban className="mr-2 h-4 w-4" />
              {t('actions.suspend')}
            </Button>
          ) : (
            <Button variant="outline" onClick={handleActivate}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {t('actions.activate')}
            </Button>
          )}
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('common:actions.edit')}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t('common:actions.delete')}
          </Button>
        </div>
      </div>

      <UserDetails user={user} />

      {/* Role Change Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('dialogs.changeRole')}</DialogTitle>
            <DialogDescription>{t('dialogs.changeRoleDescription')}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">{t('form.role')}</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('form.selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
              {t('common:actions.cancel')}
            </Button>
            <Button onClick={confirmRoleChange} disabled={updateRole.isPending}>
              {updateRole.isPending ? t('common:states.processing') : t('common:actions.update')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <AlertDialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dialogs.suspendUser')}</AlertDialogTitle>
            <AlertDialogDescription>{t('dialogs.suspendUserDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSuspend} disabled={deactivateUser.isPending}>
              {deactivateUser.isPending ? t('common:states.processing') : t('actions.suspend')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Activate Confirmation Dialog */}
      <AlertDialog open={showActivateDialog} onOpenChange={setShowActivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dialogs.activateUser')}</AlertDialogTitle>
            <AlertDialogDescription>{t('dialogs.activateUserDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmActivate} disabled={activateUser.isPending}>
              {activateUser.isPending ? t('common:states.processing') : t('actions.activate')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmations.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('confirmations.deleteMessage')}</AlertDialogDescription>
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
    </div>
  );
}
