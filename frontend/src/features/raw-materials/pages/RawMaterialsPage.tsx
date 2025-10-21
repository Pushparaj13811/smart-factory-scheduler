// Raw Materials List Page

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { useRawMaterials } from '../hooks';
import { RawMaterialList } from '../components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { RawMaterialFilters } from '../types';

export default function RawMaterialsPage() {
  const { t } = useTranslation('rawMaterials');
  const navigate = useNavigate();
  const [filters, setFilters] = useState<RawMaterialFilters>({});
  const { data, isLoading, error } = useRawMaterials(1, 100, filters);

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value || undefined }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">{t('common:loadingState.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">{t('messages.loadError')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <Button onClick={() => navigate('/raw-materials/create')}>
          <Plus className="mr-2 h-4 w-4" />
          {t('addMaterial')}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('filters.showFilters')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-10"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('stats.totalMaterials')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{data.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('stats.inStock')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {data.rawMaterials.filter((m) => m.status === 'in_stock').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('stats.lowStock')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-600">
                {data.rawMaterials.filter((m) => m.status === 'low_stock').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>{t('stats.outOfStock')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">
                {data.rawMaterials.filter((m) => m.status === 'out_of_stock').length}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Materials List */}
      {data && <RawMaterialList materials={data.rawMaterials} />}
    </div>
  );
}
