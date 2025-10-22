// Hook for fetching recent activity feed

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';

export function useRecentActivity() {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => dashboardService.getActivity(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}
