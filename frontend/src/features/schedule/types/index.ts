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

export interface TaskFilters {
  search?: string;
  status?: TaskStatus[];
  priority?: TaskPriority[];
  machineId?: string[];
  assignedTo?: string[];
  startDate?: string;
  endDate?: string;
}

export interface TasksResponse {
  tasks: ScheduleTask[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateTaskInput {
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

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  machineId?: string;
  componentId?: string;
  orderId?: string;
  startTime?: string;
  endTime?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  notes?: string;
}

export interface ReassignTaskInput {
  taskId: string;
  machineId?: string;
  assignedTo?: string;
  startTime?: string;
  endTime?: string;
}

export interface TaskStats {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  delayed: number;
  cancelled: number;
}

export interface OptimizeScheduleResult {
  optimizedTasks: ScheduleTask[];
  conflicts: Array<{ taskId: string; reason: string }>;
  suggestions: string[];
}
