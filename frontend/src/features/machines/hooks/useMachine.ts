// React Query hook for fetching a single machine

import { useQuery } from '@tanstack/react-query';
import { machineService } from '../services/machine.service';

export function useMachine(machineId: string | undefined) {
  return useQuery({
    queryKey: ['machine', machineId],
    queryFn: () => machineService.getMachine(machineId!),
    enabled: !!machineId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}
