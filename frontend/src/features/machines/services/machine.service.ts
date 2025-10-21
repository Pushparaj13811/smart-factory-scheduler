// Machine service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  Machine,
  MachinesResponse,
  CreateMachineInput,
  UpdateMachineInput,
  MachineFilters,
  MachineStats,
  MaintenanceRecord,
} from '../types';
import { MachineStatus } from '../types';

export const machineService = {
  /**
   * Get all machines with optional filters
   */
  async getMachines(
    page: number = 1,
    pageSize: number = 10,
    filters?: MachineFilters
  ): Promise<MachinesResponse> {
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
    if (filters?.location) {
      filters.location.forEach((l) => params.append('location', l));
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await apiClient.get<MachinesResponse>(
      `/machines?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a single machine by ID
   */
  async getMachine(id: string): Promise<Machine> {
    const response = await apiClient.get<Machine>(`/machines/${id}`);
    return response.data;
  },

  /**
   * Create a new machine
   */
  async createMachine(data: CreateMachineInput): Promise<Machine> {
    const response = await apiClient.post<Machine>('/machines', data);
    return response.data;
  },

  /**
   * Update an existing machine
   */
  async updateMachine(id: string, data: UpdateMachineInput): Promise<Machine> {
    const response = await apiClient.put<Machine>(`/machines/${id}`, data);
    return response.data;
  },

  /**
   * Delete a machine
   */
  async deleteMachine(id: string): Promise<void> {
    await apiClient.delete(`/machines/${id}`);
  },

  /**
   * Update machine status
   */
  async updateMachineStatus(
    id: string,
    status: MachineStatus
  ): Promise<Machine> {
    return this.updateMachine(id, { status });
  },

  /**
   * Get machine statistics
   */
  async getMachineStats(): Promise<MachineStats> {
    const response = await apiClient.get<MachineStats>('/machines/stats');
    return response.data;
  },

  /**
   * Get maintenance history for a machine
   */
  async getMaintenanceHistory(machineId: string): Promise<MaintenanceRecord[]> {
    const response = await apiClient.get<MaintenanceRecord[]>(
      `/machines/${machineId}/maintenance`
    );
    return response.data;
  },

  /**
   * Schedule maintenance for a machine
   */
  async scheduleMaintenance(
    machineId: string,
    data: {
      type: string;
      scheduledDate: string;
      description: string;
    }
  ): Promise<MaintenanceRecord> {
    const response = await apiClient.post<MaintenanceRecord>(
      `/machines/${machineId}/maintenance`,
      data
    );
    return response.data;
  },
};
