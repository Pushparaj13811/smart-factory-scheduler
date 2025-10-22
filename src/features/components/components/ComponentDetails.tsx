// Component Details component with inventory and supplier info

import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  DollarSign,
  AlertTriangle,
  TruckIcon,
  Calendar,
  Tag,
} from 'lucide-react';
import type { Component } from '../types';
import { ComponentStatus } from '../types';

interface ComponentDetailsProps {
  component: Component;
  onEdit?: () => void;
}

export function ComponentDetails({ component, onEdit }: ComponentDetailsProps) {
  const { t, i18n } = useTranslation(['componentsFeature', 'common']);

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const locale = i18n.language === 'hi' ? hi : enUS;
    return format(new Date(dateString), 'PP', { locale });
  };

  const isLowStock = component.quantityInStock <= component.reorderLevel;
  const stockPercentage = (component.quantityInStock / (component.reorderLevel * 3)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">{component.name}</h2>
          <p className="text-muted-foreground">{component.code}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={getStatusVariant(component.status)}>
            {t(`status.${component.status}`)}
          </Badge>
          {onEdit && (
            <Button onClick={onEdit}>
              {t('common:actions.edit')}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('details.overview')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('form.category')}</p>
                <p className="font-medium">{t(`categories.${component.category}`)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('form.unit')}</p>
                <p className="font-medium">{component.unit}</p>
              </div>
            </div>

            {component.description && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('form.description')}</p>
                  <p className="text-sm">{component.description}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle>{t('details.inventory')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t('form.quantityInStock')}</span>
              </div>
              <span className="text-2xl font-bold">
                {component.quantityInStock} {component.unit}
              </span>
            </div>

            {isLowStock && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                <span className="text-sm text-yellow-600 dark:text-yellow-500">
                  {t('messages.lowStockWarning')}
                </span>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('form.reorderLevel')}</span>
                <span className="font-medium">{component.reorderLevel} {component.unit}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isLowStock ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t('details.pricing')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {t('form.unitPrice')}
              </p>
              <p className="text-2xl font-bold">${component.unitPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {t('details.totalValue')}
              </p>
              <p className="text-2xl font-bold">
                ${(component.quantityInStock * component.unitPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Information */}
      {(component.supplier || component.leadTimeDays) && (
        <Card>
          <CardHeader>
            <CardTitle>{t('details.supplier')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {component.supplier && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <TruckIcon className="h-3 w-3" />
                    {t('form.supplier')}
                  </p>
                  <p className="font-medium">{component.supplier}</p>
                </div>
              )}
              {component.leadTimeDays && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {t('form.leadTimeDays')}
                  </p>
                  <p className="font-medium">{component.leadTimeDays} days</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specifications */}
      {component.specifications && Object.keys(component.specifications).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('details.specifications')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(component.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timestamps */}
      <Card>
        <CardHeader>
          <CardTitle>{t('details.timestamps')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('form.createdAt')}</p>
              <p className="font-medium">{formatDate(component.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('form.updatedAt')}</p>
              <p className="font-medium">{formatDate(component.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
