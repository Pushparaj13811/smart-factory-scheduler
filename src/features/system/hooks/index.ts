// System admin React Query hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { systemService } from '../services/system.service';
import { toast } from 'sonner';
import type { IndustryFilters, SubscriptionFilters } from '../types';

// Industries
export function useIndustries(page = 1, pageSize = 10, filters?: IndustryFilters) {
  return useQuery({
    queryKey: ['system', 'industries', page, pageSize, filters],
    queryFn: () => systemService.getIndustries(page, pageSize, filters),
  });
}

export function useIndustry(id: string) {
  return useQuery({
    queryKey: ['system', 'industry', id],
    queryFn: () => systemService.getIndustry(id),
    enabled: !!id,
  });
}

export function useSuspendIndustry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => systemService.suspendIndustry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system', 'industries'] });
      toast.success('Industry suspended successfully');
    },
  });
}

export function useActivateIndustry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => systemService.activateIndustry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system', 'industries'] });
      toast.success('Industry activated successfully');
    },
  });
}

// Subscriptions
export function useSubscriptions(page = 1, pageSize = 10, filters?: SubscriptionFilters) {
  return useQuery({
    queryKey: ['system', 'subscriptions', page, pageSize, filters],
    queryFn: () => systemService.getSubscriptions(page, pageSize, filters),
  });
}

export function useSubscription(id: string) {
  return useQuery({
    queryKey: ['system', 'subscription', id],
    queryFn: () => systemService.getSubscription(id),
    enabled: !!id,
  });
}

export function useRenewSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => systemService.renewSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system', 'subscriptions'] });
      toast.success('Subscription renewed successfully');
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => systemService.cancelSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system', 'subscriptions'] });
      toast.success('Subscription cancelled successfully');
    },
  });
}

// Platform Analytics
export function usePlatformAnalytics() {
  return useQuery({
    queryKey: ['system', 'analytics'],
    queryFn: () => systemService.getPlatformAnalytics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
