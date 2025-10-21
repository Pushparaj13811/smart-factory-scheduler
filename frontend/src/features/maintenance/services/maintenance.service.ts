// Maintenance service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  MaintenanceRecord,
  MaintenanceResponse,
  CreateMaintenanceInput,
  UpdateMaintenanceInput,
  MaintenanceFilters,
  MaintenanceStats,
  MaintenanceStatus,
  MaintenanceCalendarEvent,
} from '../types';

export const maintenanceService = {
  /**
   * Get all maintenance records with optional filters
   */
  async getRecords(
    page: number = 1,
    pageSize: number = 10,
    filters?: MaintenanceFilters
  ): Promise<MaintenanceResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.status) {
      filters.status.forEach((s) => params.append('status', s));
    }
    if (filters?.type) {
      filters.type.forEach((t) => params.append('type', t));
    }
    if (filters?.machineId) {
      params.append('machineId', filters.machineId);
    }
    if (filters?.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters?.endDate) {
      params.append('endDate', filters.endDate);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await apiClient.get<MaintenanceResponse>(
      `/maintenance?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a single maintenance record by ID
   */
  async getRecord(id: string): Promise<MaintenanceRecord> {
    const response = await apiClient.get<MaintenanceRecord>(`/maintenance/${id}`);
    return response.data;
  },

  /**
   * Create a new maintenance record
   */
  async createRecord(data: CreateMaintenanceInput): Promise<MaintenanceRecord> {
    const response = await apiClient.post<MaintenanceRecord>('/maintenance', data);
    return response.data;
  },

  /**
   * Update an existing maintenance record
   */
  async updateRecord(id: string, data: UpdateMaintenanceInput): Promise<MaintenanceRecord> {
    const response = await apiClient.put<MaintenanceRecord>(`/maintenance/${id}`, data);
    return response.data;
  },

  /**
   * Delete a maintenance record
   */
  async deleteRecord(id: string): Promise<void> {
    await apiClient.delete(`/maintenance/${id}`);
  },

  /**
   * Update maintenance status
   */
  async updateStatus(id: string, status: MaintenanceStatus): Promise<MaintenanceRecord> {
    return this.updateRecord(id, { status });
  },

  /**
   * Complete a maintenance record
   */
  async completeRecord(id: string, cost?: number, notes?: string): Promise<MaintenanceRecord> {
    return this.updateRecord(id, {
      status: 'completed' as MaintenanceStatus,
      completedDate: new Date().toISOString(),
      cost,
      notes,
    });
  },

  /**
   * Schedule a routine maintenance
   */
  async scheduleRoutine(
    machineId: string,
    scheduledDate: string,
    technician?: string
  ): Promise<MaintenanceRecord> {
    return this.createRecord({
      machineId,
      type: 'routine',
      scheduledDate,
      technician,
      description: 'Routine maintenance',
    });
  },

  /**
   * Get maintenance statistics
   */
  async getStats(): Promise<MaintenanceStats> {
    const response = await apiClient.get<MaintenanceStats>('/maintenance/stats');
    return response.data;
  },

  /**
   * Get calendar events for maintenance
   */
  async getCalendarEvents(startDate?: string, endDate?: string): Promise<MaintenanceCalendarEvent[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiClient.get<MaintenanceCalendarEvent[]>(
      `/maintenance/calendar?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get maintenance records for a specific machine
   */
  async getMachineRecords(machineId: string): Promise<MaintenanceRecord[]> {
    const response = await apiClient.get<MaintenanceRecord[]>(
      `/maintenance/machine/${machineId}`
    );
    return response.data;
  },
};
