// Schedule types

export const TaskStatus = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
  CANCELLED: 'cancelled',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export interface ScheduleTask {
  id: string;
  title: string;
  description?: string;
  machineId?: string;
  machineName?: string;
  componentId?: string;
  componentName?: string;
  orderId?: string;
  orderNumber?: string;
  startTime: string;
  endTime: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  assignedToName?: string;
  estimatedDuration?: number;
  actualDuration?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleFilters {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  machineId?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
}

export interface ScheduleResponse {
  tasks: ScheduleTask[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TaskFormData {
  title: string;
  description?: string;
  machineId?: string;
  componentId?: string;
  orderId?: string;
  startTime: string;
  endTime: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  notes?: string;
}
