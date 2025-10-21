// Machine List component with filters and search

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
import { MachineCard } from './MachineCard';
import { useMachinesPagination } from '../hooks';
import { MachineStatus, MachineType } from '../types';
import type { MachineFilters } from '../types';

export function MachineList() {
  const { t } = useTranslation(['machines', 'common']);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MachineStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<MachineType | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isLoading,
    error,
    page,
    totalPages,
    setPage,
    setFilters,
  } = useMachinesPagination(12);

  // Apply filters
  const handleApplyFilters = () => {
    const filters: MachineFilters = {};

    if (searchQuery.trim()) {
      filters.search = searchQuery.trim();
    }

    if (statusFilter !== 'all') {
      filters.status = [statusFilter];
    }

    if (typeFilter !== 'all') {
      filters.type = [typeFilter];
    }

    setFilters(Object.keys(filters).length > 0 ? filters : undefined);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setFilters(undefined);
    setPage(1);
  };

  const hasActiveFilters = searchQuery.trim() || statusFilter !== 'all' || typeFilter !== 'all';

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

  const machines = data?.machines || [];
  const total = data?.total || 0;

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
                onValueChange={(value) => setStatusFilter(value as MachineStatus | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={MachineStatus.RUNNING}>
                    {t('status.running')}
                  </SelectItem>
                  <SelectItem value={MachineStatus.IDLE}>
                    {t('status.idle')}
                  </SelectItem>
                  <SelectItem value={MachineStatus.MAINTENANCE}>
                    {t('status.maintenance')}
                  </SelectItem>
                  <SelectItem value={MachineStatus.OFFLINE}>
                    {t('status.offline')}
                  </SelectItem>
                  <SelectItem value={MachineStatus.ERROR}>
                    {t('status.error')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                {t('filters.byType')}
              </label>
              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as MachineType | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={MachineType.CNC}>{t('types.cnc')}</SelectItem>
                  <SelectItem value={MachineType.LATHE}>{t('types.lathe')}</SelectItem>
                  <SelectItem value={MachineType.MILL}>{t('types.mill')}</SelectItem>
                  <SelectItem value={MachineType.DRILL}>{t('types.drill')}</SelectItem>
                  <SelectItem value={MachineType.GRINDER}>{t('types.grinder')}</SelectItem>
                  <SelectItem value={MachineType.PRESS}>{t('types.press')}</SelectItem>
                  <SelectItem value={MachineType.WELDING}>{t('types.welding')}</SelectItem>
                  <SelectItem value={MachineType.CUTTING}>{t('types.cutting')}</SelectItem>
                  <SelectItem value={MachineType.ASSEMBLY}>{t('types.assembly')}</SelectItem>
                  <SelectItem value={MachineType.PACKAGING}>{t('types.packaging')}</SelectItem>
                  <SelectItem value={MachineType.OTHER}>{t('types.other')}</SelectItem>
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
            {typeFilter !== 'all' && (
              <Badge variant="secondary">
                {t('form.type')}: {t(`types.${typeFilter}`)}
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
          {t('common:pagination.showing')} {machines.length} {t('common:pagination.of')} {total}{' '}
          {total === 1 ? t('common:pagination.item') : t('common:pagination.items')}
        </p>
      </div>

      {/* Machine Grid */}
      {machines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noMachines')}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
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
