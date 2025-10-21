// Hook for fetching schedule summary

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';

export function useScheduleSummary() {
  return useQuery({
    queryKey: ['dashboard', 'schedule-summary'],
    queryFn: () => dashboardService.getScheduleSummary(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
