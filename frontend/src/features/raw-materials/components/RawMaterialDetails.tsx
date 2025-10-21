// Raw Material Details component

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  DollarSign,
  AlertTriangle,
  Warehouse,
  Building,
  Calendar,
} from 'lucide-react';
import type { RawMaterial } from '../types';
import { MaterialStatus } from '../types';

interface RawMaterialDetailsProps {
  material: RawMaterial;
  onEdit: () => void;
  onDelete: () => void;
}

export function RawMaterialDetails({ material, onEdit, onDelete }: RawMaterialDetailsProps) {
  const { t } = useTranslation('rawMaterials');
  const navigate = useNavigate();

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

  const totalValue = material.quantity * material.unitCost;
  const isLowStock = material.quantity <= material.reorderLevel;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/raw-materials')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{material.name}</h1>
            <p className="text-muted-foreground">{material.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            {t('common:actions.edit')}
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t('common:actions.delete')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('details.overview')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('form.description')}</p>
              <p className="mt-1">{material.description}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.category')}</span>
              <Badge variant="outline">{t(`categories.${material.category}`)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('status.in_stock')}</span>
              <Badge variant={getStatusVariant(material.status)}>
                {t(`status.${material.status}`)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t('details.inventory')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.quantity')}</span>
              <span className="font-medium">
                {material.quantity} {material.unit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.reorderLevel')}</span>
              <span className="font-medium">
                {material.reorderLevel} {material.unit}
              </span>
            </div>
            {isLowStock && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-600">{t('messages.lowStockWarning')}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cost Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t('details.pricing')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('form.unitCost')}</span>
              <span className="font-medium">${material.unitCost.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('details.totalValue')}</span>
              <span className="text-lg font-bold">${totalValue.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {t('details.supplier')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('form.supplier')}</p>
              <p className="mt-1 font-medium">{material.supplier}</p>
            </div>
            {material.supplierContact && (
              <div>
                <p className="text-sm text-muted-foreground">{t('form.supplierContact')}</p>
                <p className="mt-1">{material.supplierContact}</p>
              </div>
            )}
            {material.leadTimeDays !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('form.leadTimeDays')}</span>
                <span className="font-medium">{material.leadTimeDays} days</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Storage Information */}
        {material.storageLocation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5" />
                {t('details.storage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t('form.storageLocation')}</p>
              <p className="mt-1 font-medium">{material.storageLocation}</p>
            </CardContent>
          </Card>
        )}

        {/* Record Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('details.timestamps')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('form.createdAt')}</p>
              <p className="mt-1">{new Date(material.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('form.updatedAt')}</p>
              <p className="mt-1">{new Date(material.updatedAt).toLocaleString()}</p>
            </div>
            {material.lastRestocked && (
              <div>
                <p className="text-sm text-muted-foreground">{t('form.lastRestocked')}</p>
                <p className="mt-1">{new Date(material.lastRestocked).toLocaleString()}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        {material.specifications && Object.keys(material.specifications).length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t('details.specifications')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(material.specifications).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">{key}</p>
                    <p className="mt-1 font-medium">{String(value)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
