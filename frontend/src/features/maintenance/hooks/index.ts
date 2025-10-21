// React Query hooks for maintenance

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { maintenanceService } from '../services/maintenance.service';
import type {
  MaintenanceRecord,
  CreateMaintenanceInput,
  UpdateMaintenanceInput,
  MaintenanceFilters,
  MaintenanceStatus,
} from '../types';

// Query keys
export const maintenanceKeys = {
  all: ['maintenance'] as const,
  lists: () => [...maintenanceKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, filters?: MaintenanceFilters) =>
    [...maintenanceKeys.lists(), { page, pageSize, filters }] as const,
  details: () => [...maintenanceKeys.all, 'detail'] as const,
  detail: (id: string) => [...maintenanceKeys.details(), id] as const,
  stats: () => [...maintenanceKeys.all, 'stats'] as const,
  calendar: () => [...maintenanceKeys.all, 'calendar'] as const,
  machine: (machineId: string) => [...maintenanceKeys.all, 'machine', machineId] as const,
};

/**
 * Hook to fetch maintenance records with pagination and filters
 */
export function useMaintenanceRecords(
  page: number = 1,
  pageSize: number = 10,
  filters?: MaintenanceFilters
) {
  return useQuery({
    queryKey: maintenanceKeys.list(page, pageSize, filters),
    queryFn: () => maintenanceService.getRecords(page, pageSize, filters),
  });
}

/**
 * Hook to fetch a single maintenance record
 */
export function useMaintenanceRecord(id: string) {
  return useQuery({
    queryKey: maintenanceKeys.detail(id),
    queryFn: () => maintenanceService.getRecord(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch maintenance statistics
 */
export function useMaintenanceStats() {
  return useQuery({
    queryKey: maintenanceKeys.stats(),
    queryFn: () => maintenanceService.getStats(),
  });
}

/**
 * Hook to fetch maintenance calendar events
 */
export function useMaintenanceCalendar(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: maintenanceKeys.calendar(),
    queryFn: () => maintenanceService.getCalendarEvents(startDate, endDate),
  });
}

/**
 * Hook to fetch maintenance records for a specific machine
 */
export function useMachineMaintenanceRecords(machineId: string) {
  return useQuery({
    queryKey: maintenanceKeys.machine(machineId),
    queryFn: () => maintenanceService.getMachineRecords(machineId),
    enabled: !!machineId,
  });
}

/**
 * Hook to create a new maintenance record
 */
export function useCreateMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaintenanceInput) => maintenanceService.createRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.stats() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.calendar() });
    },
  });
}

/**
 * Hook to update a maintenance record
 */
export function useUpdateMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMaintenanceInput }) =>
      maintenanceService.updateRecord(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.stats() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.calendar() });
      if (data.machineId) {
        queryClient.invalidateQueries({ queryKey: maintenanceKeys.machine(data.machineId) });
      }
    },
  });
}

/**
 * Hook to delete a maintenance record
 */
export function useDeleteMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => maintenanceService.deleteRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.stats() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.calendar() });
    },
  });
}

/**
 * Hook to update maintenance status
 */
export function useUpdateMaintenanceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: MaintenanceStatus }) =>
      maintenanceService.updateStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.stats() });
    },
  });
}

/**
 * Hook to complete a maintenance record
 */
export function useCompleteMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, cost, notes }: { id: string; cost?: number; notes?: string }) =>
      maintenanceService.completeRecord(id, cost, notes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.stats() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.calendar() });
    },
  });
}

/**
 * Hook to schedule routine maintenance
 */
export function useScheduleRoutineMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      machineId,
      scheduledDate,
      technician,
    }: {
      machineId: string;
      scheduledDate: string;
      technician?: string;
    }) => maintenanceService.scheduleRoutine(machineId, scheduledDate, technician),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.stats() });
      queryClient.invalidateQueries({ queryKey: maintenanceKeys.calendar() });
    },
  });
}
