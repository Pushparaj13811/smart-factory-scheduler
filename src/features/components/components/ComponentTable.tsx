// Component Table component

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
import { MoreVertical, Eye, Edit, Trash2, Package, DollarSign } from 'lucide-react';
import type { Component } from '../types';
import { ComponentStatus } from '../types';
import { useDeleteComponent } from '../hooks';

interface ComponentTableProps {
  components: Component[];
}

export function ComponentTable({ components }: ComponentTableProps) {
  const { t } = useTranslation(['componentsFeature', 'common']);
  const navigate = useNavigate();
  const deleteComponent = useDeleteComponent();
  const [componentToDelete, setComponentToDelete] = useState<Component | null>(null);

  const getStatusVariant = (status: ComponentStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case ComponentStatus.IN_STOCK:
        return 'default';
      case ComponentStatus.LOW_STOCK:
        return 'outline';
      case ComponentStatus.OUT_OF_STOCK:
      case ComponentStatus.DISCONTINUED:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleView = (componentId: string) => {
    navigate(`/components/${componentId}`);
  };

  const handleEdit = (componentId: string) => {
    navigate(`/components/${componentId}/edit`);
  };

  const handleDelete = (component: Component) => {
    setComponentToDelete(component);
  };

  const confirmDelete = () => {
    if (componentToDelete) {
      deleteComponent.mutate(componentToDelete.id, {
        onSuccess: () => {
          setComponentToDelete(null);
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
              <TableHead className="text-white">{t('form.quantityInStock')}</TableHead>
              <TableHead className="text-white">{t('form.unitPrice')}</TableHead>
              <TableHead className="text-right text-white">{t('common:actions.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((component) => (
              <TableRow
                key={component.id}
                className="cursor-pointer"
                onClick={() => handleView(component.id)}
              >
                <TableCell className="font-medium">{component.name}</TableCell>
                <TableCell className="text-muted-foreground">{component.code}</TableCell>
                <TableCell className="text-muted-foreground">{t(`categories.${component.category}`)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(component.status)}>
                    {t(`status.${component.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-3 w-3" />
                    <span>{component.quantityInStock} {component.unit}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>${component.unitPrice.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(component.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t('common:actions.view')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(component.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t('common:actions.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(component)}
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
      <AlertDialog open={!!componentToDelete} onOpenChange={(open) => !open && setComponentToDelete(null)}>
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
              disabled={deleteComponent.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteComponent.isPending ? t('common:states.processing') : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
