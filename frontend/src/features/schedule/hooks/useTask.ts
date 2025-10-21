// React Query hook for fetching single task

import { useQuery } from '@tanstack/react-query';
import { scheduleService } from '../services/schedule.service';

export function useTask(id: string | undefined) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => scheduleService.getTask(id!),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
