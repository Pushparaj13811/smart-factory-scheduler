// Raw Material Details Page

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
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
import { useRawMaterial, useDeleteRawMaterial } from '../hooks';
import { RawMaterialDetails } from '../components';

export default function RawMaterialDetailsPage() {
  const { t } = useTranslation('rawMaterials');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: material, isLoading, error } = useRawMaterial(id!);
  const deleteMaterial = useDeleteRawMaterial();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    navigate(`/raw-materials/${id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteMaterial.mutate(id!, {
      onSuccess: () => {
        navigate('/raw-materials');
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">{t('common:loadingState.loading')}</p>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">{t('messages.loadError')}</p>
      </div>
    );
  }

  return (
    <>
      <RawMaterialDetails material={material} onEdit={handleEdit} onDelete={handleDelete} />

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
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
