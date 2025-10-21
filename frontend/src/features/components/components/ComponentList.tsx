// Component List component with filters and search

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Filter, X } from 'lucide-react';
import { ComponentCard } from './ComponentCard';
import { useComponents } from '../hooks';
import { ComponentStatus, ComponentCategory } from '../types';
import type { ComponentFilters } from '../types';

export function ComponentList() {
  const { t } = useTranslation(['componentsFeature', 'common']);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComponentStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ComponentCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Build filters object
  const filters: ComponentFilters = {};
  if (searchQuery.trim()) {
    filters.search = searchQuery.trim();
  }
  if (statusFilter !== 'all') {
    filters.status = statusFilter;
  }
  if (categoryFilter !== 'all') {
    filters.category = categoryFilter;
  }

  const {
    data,
    isLoading,
    error,
  } = useComponents(page, pageSize, Object.keys(filters).length > 0 ? filters : undefined);

  // Apply filters
  const handleApplyFilters = () => {
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setPage(1);
  };

  const hasActiveFilters = searchQuery.trim() || statusFilter !== 'all' || categoryFilter !== 'all';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-destructive">{t('messages.loadError')}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          {t('common:actions.tryAgain')}
        </Button>
      </div>
    );
  }

  const components = data?.components || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleApplyFilters();
                }
              }}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="whitespace-nowrap"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? t('filters.hideFilters') : t('filters.showFilters')}
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-col sm:flex-row gap-3 p-4 border rounded-lg bg-muted/50">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                {t('filters.byStatus')}
              </label>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as ComponentStatus | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={ComponentStatus.IN_STOCK}>
                    {t('status.in_stock')}
                  </SelectItem>
                  <SelectItem value={ComponentStatus.LOW_STOCK}>
                    {t('status.low_stock')}
                  </SelectItem>
                  <SelectItem value={ComponentStatus.OUT_OF_STOCK}>
                    {t('status.out_of_stock')}
                  </SelectItem>
                  <SelectItem value={ComponentStatus.DISCONTINUED}>
                    {t('status.discontinued')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                {t('filters.byCategory')}
              </label>
              <Select
                value={categoryFilter}
                onValueChange={(value) => setCategoryFilter(value as ComponentCategory | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={ComponentCategory.MECHANICAL}>
                    {t('categories.mechanical')}
                  </SelectItem>
                  <SelectItem value={ComponentCategory.ELECTRONIC}>
                    {t('categories.electronic')}
                  </SelectItem>
                  <SelectItem value={ComponentCategory.ASSEMBLY}>
                    {t('categories.assembly')}
                  </SelectItem>
                  <SelectItem value={ComponentCategory.CUSTOM}>
                    {t('categories.custom')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleApplyFilters}>
                {t('common:actions.filter')}
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" onClick={handleClearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  {t('filters.clearFilters')}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Active filters display */}
        {hasActiveFilters && !showFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">{t('common:actions.filter')}:</span>
            {searchQuery && (
              <Badge variant="secondary">
                {t('common:actions.search')}: {searchQuery}
              </Badge>
            )}
            {statusFilter !== 'all' && (
              <Badge variant="secondary">
                {t('form.status')}: {t(`status.${statusFilter}`)}
              </Badge>
            )}
            {categoryFilter !== 'all' && (
              <Badge variant="secondary">
                {t('form.category')}: {t(`categories.${categoryFilter}`)}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-6 px-2"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('common:pagination.showing')} {components.length} {t('common:pagination.of')} {total}{' '}
          {total === 1 ? t('common:pagination.item') : t('common:pagination.items')}
        </p>
      </div>

      {/* Component Grid */}
      {components.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noComponents')}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {components.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            {t('common:actions.previous')}
          </Button>
          <span className="text-sm">
            {t('common:pagination.page')} {page} {t('common:pagination.of')} {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            {t('common:actions.next')}
          </Button>
        </div>
      )}
    </div>
  );
}
