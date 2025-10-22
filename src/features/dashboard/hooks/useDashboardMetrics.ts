// Hook for fetching dashboard metrics

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { useAuth } from '@/hooks/useAuth';

export function useDashboardMetrics() {
  const { user } = useAuth();
  const isSystemAdmin = user?.role === 'SYSTEM_ADMIN';

  return useQuery({
    queryKey: ['dashboard', 'metrics', user?.id],
    queryFn: () =>
      isSystemAdmin
        ? dashboardService.getSystemAdminMetrics()
        : dashboardService.getMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}
