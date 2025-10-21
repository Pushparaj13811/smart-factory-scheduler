// Hook for fetching machine status

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';

export function useMachineStatus() {
  return useQuery({
    queryKey: ['dashboard', 'machine-status'],
    queryFn: () => dashboardService.getMachineStatus(),
    staleTime: 3 * 60 * 1000, // 3 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}
