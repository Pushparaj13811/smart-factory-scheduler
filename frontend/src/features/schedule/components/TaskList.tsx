// Task List component with filters and search

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
import { TaskCard } from './TaskCard';
import { useTasks } from '../hooks';
import { TaskStatus, TaskPriority } from '../types';
import type { TaskFilters } from '../types';

export function TaskList() {
  const { t } = useTranslation(['schedule', 'common']);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof TaskStatus[keyof typeof TaskStatus] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<typeof TaskPriority[keyof typeof TaskPriority] | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Build filters object
  const filters: TaskFilters = {};
  if (searchQuery.trim()) {
    filters.search = searchQuery.trim();
  }
  if (statusFilter !== 'all') {
    filters.status = [statusFilter];
  }
  if (priorityFilter !== 'all') {
    filters.priority = [priorityFilter];
  }

  const {
    data,
    isLoading,
    error,
  } = useTasks(page, pageSize, Object.keys(filters).length > 0 ? filters : undefined);

  // Apply filters
  const handleApplyFilters = () => {
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setPage(1);
  };

  const hasActiveFilters = searchQuery.trim() || statusFilter !== 'all' || priorityFilter !== 'all';

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

  const tasks = data?.tasks || [];
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
                onValueChange={(value) => setStatusFilter(value as typeof TaskStatus[keyof typeof TaskStatus] | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={TaskStatus.SCHEDULED}>
                    {t('status.scheduled')}
                  </SelectItem>
                  <SelectItem value={TaskStatus.IN_PROGRESS}>
                    {t('status.in_progress')}
                  </SelectItem>
                  <SelectItem value={TaskStatus.COMPLETED}>
                    {t('status.completed')}
                  </SelectItem>
                  <SelectItem value={TaskStatus.DELAYED}>
                    {t('status.delayed')}
                  </SelectItem>
                  <SelectItem value={TaskStatus.CANCELLED}>
                    {t('status.cancelled')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                {t('filters.byPriority')}
              </label>
              <Select
                value={priorityFilter}
                onValueChange={(value) => setPriorityFilter(value as typeof TaskPriority[keyof typeof TaskPriority] | 'all')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('filters.all')}</SelectItem>
                  <SelectItem value={TaskPriority.URGENT}>
                    {t('priority.urgent')}
                  </SelectItem>
                  <SelectItem value={TaskPriority.HIGH}>
                    {t('priority.high')}
                  </SelectItem>
                  <SelectItem value={TaskPriority.MEDIUM}>
                    {t('priority.medium')}
                  </SelectItem>
                  <SelectItem value={TaskPriority.LOW}>
                    {t('priority.low')}
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
            {priorityFilter !== 'all' && (
              <Badge variant="secondary">
                {t('form.priority')}: {t(`priority.${priorityFilter}`)}
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
          {t('common:pagination.showing')} {tasks.length} {t('common:pagination.of')} {total}{' '}
          {total === 1 ? t('common:pagination.item') : t('common:pagination.items')}
        </p>
      </div>

      {/* Task Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noTasks')}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
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
