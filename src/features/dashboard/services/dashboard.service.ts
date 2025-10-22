// Dashboard service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  DashboardMetrics,
  ActivityItem,
  ScheduleTask,
  MachineStatusSummary,
} from '../types';

export const dashboardService = {
  /**
   * Get dashboard metrics
   */
  async getMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get<DashboardMetrics>('/dashboard/metrics');
    return response.data;
  },

  /**
   * Get system admin specific metrics
   */
  async getSystemAdminMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get<DashboardMetrics>(
      '/dashboard/system-admin/metrics'
    );
    return response.data;
  },

  /**
   * Get recent activity
   */
  async getActivity(): Promise<ActivityItem[]> {
    const response = await apiClient.get<ActivityItem[]>('/dashboard/activity');
    return response.data;
  },

  /**
   * Get schedule summary
   */
  async getScheduleSummary(): Promise<ScheduleTask[]> {
    const response = await apiClient.get<ScheduleTask[]>('/dashboard/schedule');
    return response.data;
  },

  /**
   * Get machine status summary
   */
  async getMachineStatus(): Promise<MachineStatusSummary> {
    const response = await apiClient.get<MachineStatusSummary>(
      '/dashboard/machine-status'
    );
    return response.data;
  },
};
