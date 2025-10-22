// React Query hook for fetching machine statistics

import { useQuery } from '@tanstack/react-query';
import { machineService } from '../services/machine.service';

export function useMachineStats() {
  return useQuery({
    queryKey: ['machine-stats'],
    queryFn: () => machineService.getMachineStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}
