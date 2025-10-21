// Maintenance Management page

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Plus, Filter, X, Search } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { MaintenanceList } from '../components';
import { useMaintenanceRecords } from '../hooks';
import { MaintenanceStatus, MaintenanceType } from '../types';
import type { MaintenanceFilters } from '../types';

export default function MaintenancePage() {
  const { t } = useTranslation(['maintenance', 'common']);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<MaintenanceType | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Build filters object
  const filters: MaintenanceFilters = {};
  if (searchQuery.trim()) {
    filters.search = searchQuery.trim();
  }
  if (statusFilter !== 'all') {
    filters.status = [statusFilter];
  }
  if (typeFilter !== 'all') {
    filters.type = [typeFilter];
  }

  const {
    data,
    isLoading,
    error,
  } = useMaintenanceRecords(page, pageSize, Object.keys(filters).length > 0 ? filters : undefined);

  const handleApplyFilters = () => {
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
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

  const records = data?.records || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button onClick={() => navigate('/maintenance/create')}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addMaintenance')}
          </Button>
        }
      />

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
                onValueChange={(value) => setStatusFilter(value as MaintenanceStatus | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={MaintenanceStatus.SCHEDULED}>
                    {t('status.scheduled')}
                  </SelectItem>
                  <SelectItem value={MaintenanceStatus.IN_PROGRESS}>
                    {t('status.in_progress')}
                  </SelectItem>
                  <SelectItem value={MaintenanceStatus.COMPLETED}>
                    {t('status.completed')}
                  </SelectItem>
                  <SelectItem value={MaintenanceStatus.OVERDUE}>
                    {t('status.overdue')}
                  </SelectItem>
                  <SelectItem value={MaintenanceStatus.CANCELLED}>
                    {t('status.cancelled')}
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
                onValueChange={(value) => setTypeFilter(value as MaintenanceType | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={MaintenanceType.ROUTINE}>
                    {t('type.routine')}
                  </SelectItem>
                  <SelectItem value={MaintenanceType.PREVENTIVE}>
                    {t('type.preventive')}
                  </SelectItem>
                  <SelectItem value={MaintenanceType.CORRECTIVE}>
                    {t('type.corrective')}
                  </SelectItem>
                  <SelectItem value={MaintenanceType.EMERGENCY}>
                    {t('type.emergency')}
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
            {typeFilter !== 'all' && (
              <Badge variant="secondary">
                {t('form.type')}: {t(`type.${typeFilter}`)}
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
          {t('common:pagination.showing')} {records.length} {t('common:pagination.of')} {total}{' '}
          {total === 1 ? t('common:pagination.item') : t('common:pagination.items')}
        </p>
      </div>

      {/* Maintenance List */}
      {records.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noMaintenance')}</p>
        </div>
      ) : (
        <MaintenanceList records={records} />
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
