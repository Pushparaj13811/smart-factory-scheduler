// Raw Material Table component

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
import { MoreVertical, Eye, Edit, Trash2, Package, DollarSign, AlertTriangle } from 'lucide-react';
import type { RawMaterial } from '../types';
import { MaterialStatus } from '../types';
import { useDeleteRawMaterial } from '../hooks';

interface RawMaterialTableProps {
  materials: RawMaterial[];
}

export function RawMaterialTable({ materials }: RawMaterialTableProps) {
  const { t } = useTranslation(['rawMaterials', 'common']);
  const navigate = useNavigate();
  const deleteMaterial = useDeleteRawMaterial();
  const [materialToDelete, setMaterialToDelete] = useState<RawMaterial | null>(null);

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

  const handleView = (materialId: string) => {
    navigate(`/raw-materials/${materialId}`);
  };

  const handleEdit = (materialId: string) => {
    navigate(`/raw-materials/${materialId}/edit`);
  };

  const handleDelete = (material: RawMaterial) => {
    setMaterialToDelete(material);
  };

  const confirmDelete = () => {
    if (materialToDelete) {
      deleteMaterial.mutate(materialToDelete.id, {
        onSuccess: () => {
          setMaterialToDelete(null);
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
              <TableHead className="text-white">{t('form.code')}</TableHead>
              <TableHead className="text-white">{t('form.category')}</TableHead>
              <TableHead className="text-white">{t('form.status')}</TableHead>
              <TableHead className="text-white">{t('form.quantity')}</TableHead>
              <TableHead className="text-white">{t('form.unitCost')}</TableHead>
              <TableHead className="text-white">{t('details.totalValue')}</TableHead>
              <TableHead className="text-white">{t('form.supplier')}</TableHead>
              <TableHead className="text-right text-white">{t('common:actions.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => {
              const isLowStock = material.quantity <= material.reorderLevel;
              const totalValue = material.quantity * material.unitCost;
              return (
                <TableRow
                  key={material.id}
                  className={`cursor-pointer ${isLowStock ? 'bg-destructive/5' : ''}`}
                  onClick={() => handleView(material.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      {isLowStock && <AlertTriangle className="h-4 w-4 text-destructive" />}
                      {material.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{material.code}</TableCell>
                  <TableCell className="text-muted-foreground">{material.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(material.status)}>
                      {t(`status.${material.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-3 w-3" />
                      <span>{material.quantity} {material.unit}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">${material.unitCost.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-medium">
                      <DollarSign className="h-3 w-3" />
                      <span>${totalValue.toFixed(2)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{material.supplier || '-'}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(material.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t('common:actions.view')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(material.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('common:actions.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(material)}
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
      <AlertDialog open={!!materialToDelete} onOpenChange={(open) => !open && setMaterialToDelete(null)}>
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
              disabled={deleteMaterial.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMaterial.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
