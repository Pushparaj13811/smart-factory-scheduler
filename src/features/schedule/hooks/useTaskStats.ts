// React Query hook for fetching task statistics

import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '../services/schedule.service';

export function useTaskStats() {
  return useQuery({
    queryKey: ['task-stats'],
    queryFn: () => scheduleService.getTaskStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}
