// React Query hook for fetching tasks list

import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '../services/schedule.service';
import type { TaskFilters } from '../types';
import { useState } from 'react';

export function useTasks(
  page: number = 1,
  pageSize: number = 10,
  filters?: TaskFilters
) {
  return useQuery({
    queryKey: ['tasks', page, pageSize, filters],
    queryFn: () => scheduleService.getTasks(page, pageSize, filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}

export function useTasksPagination(initialPageSize: number = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState<TaskFilters | undefined>();

  const query = useTasks(page, pageSize, filters);

  return {
    ...query,
    page,
    pageSize,
    filters,
    setPage,
    setPageSize,
    setFilters,
    totalPages: query.data ? Math.ceil(query.data.total / pageSize) : 0,
  };
}
