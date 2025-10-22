// Raw Material Card component for grid view

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
import { MoreVertical, Eye, Edit, Trash2, Package, DollarSign, AlertTriangle } from 'lucide-react';
import type { RawMaterial } from '../types';
import { MaterialStatus } from '../types';
import { useState } from 'react';
import { useDeleteRawMaterial } from '../hooks';

interface RawMaterialCardProps {
  material: RawMaterial;
}

export function RawMaterialCard({ material }: RawMaterialCardProps) {
  const { t } = useTranslation(['rawMaterials', 'common']);
  const navigate = useNavigate();
  const deleteMaterial = useDeleteRawMaterial();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getStatusVariant = (status: MaterialStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case MaterialStatus.IN_STOCK:
        return 'default';
      case MaterialStatus.LOW_STOCK:
        return 'outline';
      case MaterialStatus.OUT_OF_STOCK:
        return 'destructive';
      case MaterialStatus.ORDERED:
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const handleView = () => {
    navigate(`/raw-materials/${material.id}`);
  };

  const handleEdit = () => {
    navigate(`/raw-materials/${material.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteMaterial.mutate(material.id, {
      onSuccess: () => {
        setShowDeleteDialog(false);
      },
    });
  };

  const totalValue = material.quantity * material.unitCost;
  const isLowStock = material.quantity <= material.reorderLevel;

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleView}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg">{material.name}</CardTitle>
              <CardDescription className="text-sm">{material.code}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('common:actions.view')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t('common:actions.edit')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('common:actions.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={getStatusVariant(material.status)}>
              {t(`status.${material.status}`)}
            </Badge>
            <Badge variant="outline">{t(`categories.${material.category}`)}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Package className="h-3.5 w-3.5" />
                {t('form.quantity')}
              </span>
              <span className="font-medium">
                {material.quantity} {material.unit}
              </span>
            </div>
            {isLowStock && (
              <div className="flex items-center gap-1 text-xs text-amber-600">
                <AlertTriangle className="h-3 w-3" />
                {t('messages.lowStockWarning')}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              {t('details.totalValue')}
            </span>
            <span className="font-medium">${totalValue.toFixed(2)}</span>
          </div>

          <div className="text-xs text-muted-foreground truncate">
            {material.supplier}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
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
