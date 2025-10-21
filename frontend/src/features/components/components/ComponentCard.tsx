// Component Card component for grid view

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
import { MoreVertical, Eye, Edit, Trash2, Package, DollarSign } from 'lucide-react';
import type { Component } from '../types';
import { ComponentStatus } from '../types';
import { useState } from 'react';
import { useDeleteComponent } from '../hooks';

interface ComponentCardProps {
  component: Component;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const { t } = useTranslation(['componentsFeature', 'common']);
  const navigate = useNavigate();
  const deleteComponent = useDeleteComponent();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleView = () => {
    navigate(`/components/${component.id}`);
  };

  const handleEdit = () => {
    navigate(`/components/${component.id}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteComponent.mutate(component.id, {
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
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <CardDescription>{component.code}</CardDescription>
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
              <Badge variant={getStatusVariant(component.status)}>
                {t(`status.${component.status}`)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.category')}</span>
              <span className="text-sm font-medium">{t(`categories.${component.category}`)}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('form.quantityInStock')}
                </span>
              </div>
              <span className="text-sm font-medium">{component.quantityInStock} {component.unit}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('form.unitPrice')}
                </span>
              </div>
              <span className="text-sm font-medium">${component.unitPrice.toFixed(2)}</span>
            </div>
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
              disabled={deleteComponent.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteComponent.isPending
                ? t('common:states.processing')
                : t('common:actions.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
