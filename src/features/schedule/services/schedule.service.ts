// Schedule service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  ScheduleTask,
  TasksResponse,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilters,
  TaskStats,
  OptimizeScheduleResult,
  ReassignTaskInput,
} from '../types';

export const scheduleService = {
  /**
   * Get all tasks with optional filters
   */
  async getTasks(
    page: number = 1,
    pageSize: number = 10,
    filters?: TaskFilters
  ): Promise<TasksResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.status) {
      filters.status.forEach((s) => params.append('status', s));
    }
    if (filters?.priority) {
      filters.priority.forEach((p) => params.append('priority', p));
    }
    if (filters?.machineId) {
      filters.machineId.forEach((m) => params.append('machineId', m));
    }
    if (filters?.assignedTo) {
      filters.assignedTo.forEach((a) => params.append('assignedTo', a));
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

    const response = await apiClient.get<TasksResponse>(
      `/schedule/tasks?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a single task by ID
   */
  async getTask(id: string): Promise<ScheduleTask> {
    const response = await apiClient.get<ScheduleTask>(`/schedule/tasks/${id}`);
    return response.data;
  },

  /**
   * Create a new task
   */
  async createTask(data: CreateTaskInput): Promise<ScheduleTask> {
    const response = await apiClient.post<ScheduleTask>('/schedule/tasks', data);
    return response.data;
  },

  /**
   * Update an existing task
   */
  async updateTask(id: string, data: UpdateTaskInput): Promise<ScheduleTask> {
    const response = await apiClient.put<ScheduleTask>(`/schedule/tasks/${id}`, data);
    return response.data;
  },

  /**
   * Delete a task
   */
  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/schedule/tasks/${id}`);
  },

  /**
   * Get task statistics
   */
  async getTaskStats(): Promise<TaskStats> {
    const response = await apiClient.get<TaskStats>('/schedule/stats');
    return response.data;
  },

  /**
   * Optimize schedule
   * Analyzes current schedule and suggests improvements
   */
  async optimizeSchedule(): Promise<OptimizeScheduleResult> {
    const response = await apiClient.post<OptimizeScheduleResult>(
      '/schedule/optimize'
    );
    return response.data;
  },

  /**
   * Reassign a task to different machine/worker
   */
  async reassignTask(data: ReassignTaskInput): Promise<ScheduleTask> {
    const response = await apiClient.post<ScheduleTask>(
      `/schedule/tasks/${data.taskId}/reassign`,
      data
    );
    return response.data;
  },

  /**
   * Get tasks by machine ID
   */
  async getTasksByMachine(machineId: string): Promise<ScheduleTask[]> {
    const response = await apiClient.get<ScheduleTask[]>(
      `/schedule/tasks/machine/${machineId}`
    );
    return response.data;
  },

  /**
   * Get tasks by order ID
   */
  async getTasksByOrder(orderId: string): Promise<ScheduleTask[]> {
    const response = await apiClient.get<ScheduleTask[]>(
      `/schedule/tasks/order/${orderId}`
    );
    return response.data;
  },

  /**
   * Get tasks assigned to a user
   */
  async getTasksByAssignee(userId: string): Promise<ScheduleTask[]> {
    const response = await apiClient.get<ScheduleTask[]>(
      `/schedule/tasks/assignee/${userId}`
    );
    return response.data;
  },
};
