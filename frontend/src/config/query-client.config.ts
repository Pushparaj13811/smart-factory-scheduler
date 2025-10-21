// React Query (TanStack Query) configuration

import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,

      // Cache time: Unused data is garbage collected after 10 minutes
      gcTime: 10 * 60 * 1000,

      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },

      // Don't refetch on window focus in development
      refetchOnWindowFocus: import.meta.env.MODE === 'production',

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Error handling
      throwOnError: false,
    },
    mutations: {
      // Global mutation error handler
      onError: (error: any) => {
        const message = error?.response?.data?.message || 'An error occurred';
        toast.error(message);
      },

      // Retry mutations once
      retry: 1,
    },
  },
});

// Query key factory for consistent cache keys
export const queryKeys = {
  // Auth
  auth: {
    me: ['auth', 'me'] as const,
  },

  // Machines
  machines: {
    all: ['machines'] as const,
    lists: () => [...queryKeys.machines.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.machines.lists(), { filters }] as const,
    details: () => [...queryKeys.machines.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.machines.details(), id] as const,
    maintenanceHistory: (id: string) => [...queryKeys.machines.detail(id), 'maintenance'] as const,
    utilization: (id: string) => [...queryKeys.machines.detail(id), 'utilization'] as const,
  },

  // Components
  components: {
    all: ['components'] as const,
    lists: () => [...queryKeys.components.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.components.lists(), { filters }] as const,
    details: () => [...queryKeys.components.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.components.details(), id] as const,
    productionHistory: (id: string) =>
      [...queryKeys.components.detail(id), 'production'] as const,
  },

  // Raw Materials
  rawMaterials: {
    all: ['raw-materials'] as const,
    lists: () => [...queryKeys.rawMaterials.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.rawMaterials.lists(), { filters }] as const,
    details: () => [...queryKeys.rawMaterials.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.rawMaterials.details(), id] as const,
    lowStock: () => [...queryKeys.rawMaterials.all, 'low-stock'] as const,
    usageHistory: (id: string) => [...queryKeys.rawMaterials.detail(id), 'usage'] as const,
  },

  // Orders
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.orders.lists(), { filters }] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
  },

  // Schedule
  schedule: {
    all: ['schedule'] as const,
    current: () => [...queryKeys.schedule.all, 'current'] as const,
    byMachine: (machineId: string) => [...queryKeys.schedule.all, 'machine', machineId] as const,
    byWorker: (workerId: string) => [...queryKeys.schedule.all, 'worker', workerId] as const,
    optimizationHistory: () => [...queryKeys.schedule.all, 'optimization'] as const,
  },

  // Maintenance
  maintenance: {
    all: ['maintenance'] as const,
    lists: () => [...queryKeys.maintenance.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.maintenance.lists(), { filters }] as const,
    scheduled: () => [...queryKeys.maintenance.all, 'scheduled'] as const,
    history: () => [...queryKeys.maintenance.all, 'history'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    activityLog: (id: string) => [...queryKeys.users.detail(id), 'activity'] as const,
  },

  // Reports
  reports: {
    all: ['reports'] as const,
    scheduled: () => [...queryKeys.reports.all, 'scheduled'] as const,
  },

  // Dashboard
  dashboard: {
    all: ['dashboard'] as const,
    metrics: () => [...queryKeys.dashboard.all, 'metrics'] as const,
    activities: () => [...queryKeys.dashboard.all, 'activities'] as const,
  },

  // System Admin
  system: {
    industries: {
      all: ['system', 'industries'] as const,
      lists: () => [...queryKeys.system.industries.all, 'list'] as const,
      list: (filters: string) => [...queryKeys.system.industries.lists(), { filters }] as const,
      detail: (id: string) => [...queryKeys.system.industries.all, 'detail', id] as const,
    },
    subscriptions: {
      all: ['system', 'subscriptions'] as const,
      lists: () => [...queryKeys.system.subscriptions.all, 'list'] as const,
      list: (filters: string) => [...queryKeys.system.subscriptions.lists(), { filters }] as const,
      detail: (id: string) => [...queryKeys.system.subscriptions.all, 'detail', id] as const,
    },
    analytics: {
      all: ['system', 'analytics'] as const,
      platformMetrics: () => [...queryKeys.system.analytics.all, 'platform'] as const,
    },
  },
};
