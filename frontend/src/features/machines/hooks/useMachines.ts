// React Query hook for fetching machines list

import { useQuery } from '@tanstack/react-query';
import { machineService } from '../services/machine.service';
import type { MachineFilters } from '../types';
import { useState } from 'react';

export function useMachines(
  page: number = 1,
  pageSize: number = 10,
  filters?: MachineFilters
) {
  return useQuery({
    queryKey: ['machines', page, pageSize, filters],
    queryFn: () => machineService.getMachines(page, pageSize, filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}

export function useMachinesPagination(initialPageSize: number = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [filters, setFilters] = useState<MachineFilters | undefined>();

  const query = useMachines(page, pageSize, filters);

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
