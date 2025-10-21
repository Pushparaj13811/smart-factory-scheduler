// User List component with filters and search

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
import { UserCard } from './UserCard';
import { useUsers } from '../hooks';
import { UserRole, ROLE_LABELS } from '@/constants/roles';
import type { UserFilters } from '../types';

export function UserList() {
  const { t } = useTranslation(['users', 'common']);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<UserFilters | undefined>();

  const pageSize = 12;
  const { data, isLoading, error } = useUsers(filters, page, pageSize);

  // Apply filters
  const handleApplyFilters = () => {
    const newFilters: UserFilters = {};

    if (searchQuery.trim()) {
      newFilters.search = searchQuery.trim();
    }

    if (roleFilter !== 'all') {
      newFilters.role = [roleFilter];
    }

    setFilters(Object.keys(newFilters).length > 0 ? newFilters : undefined);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setFilters(undefined);
    setPage(1);
  };

  const hasActiveFilters = searchQuery.trim() || roleFilter !== 'all';

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

  const users = data?.users || [];
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
              <label className="text-sm font-medium mb-2 block">{t('filters.byRole')}</label>
              <Select
                value={roleFilter}
                onValueChange={(value) => setRoleFilter(value as UserRole | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleApplyFilters}>{t('common:actions.filter')}</Button>
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
            {roleFilter !== 'all' && (
              <Badge variant="secondary">
                {t('form.role')}: {ROLE_LABELS[roleFilter]}
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
          {t('common:pagination.showing')} {users.length} {t('common:pagination.of')} {total}{' '}
          {total === 1 ? t('common:pagination.item') : t('common:pagination.items')}
        </p>
      </div>

      {/* User Grid */}
      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noUsers')}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>
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
