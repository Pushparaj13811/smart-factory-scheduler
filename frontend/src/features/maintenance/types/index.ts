// Maintenance types and interfaces

export const MaintenanceType = {
  ROUTINE: 'routine',
  PREVENTIVE: 'preventive',
  CORRECTIVE: 'corrective',
  EMERGENCY: 'emergency',
} as const;

export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

export const MaintenanceStatus = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OVERDUE: 'overdue',
} as const;

export type MaintenanceStatus = (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  machineName?: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate?: string;
  technician?: string;
  cost?: number;
  notes?: string;
  description?: string;
  industryId: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMaintenanceInput {
  machineId: string;
  type: MaintenanceType;
  scheduledDate: string;
  technician?: string;
  notes?: string;
  description?: string;
}

export interface UpdateMaintenanceInput {
  machineId?: string;
  type?: MaintenanceType;
  status?: MaintenanceStatus;
  scheduledDate?: string;
  completedDate?: string;
  technician?: string;
  cost?: number;
  notes?: string;
  description?: string;
}

export interface MaintenanceFilters {
  status?: MaintenanceStatus[];
  type?: MaintenanceType[];
  machineId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface MaintenanceResponse {
  records: MaintenanceRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export interface MaintenanceStats {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  overdue: number;
  totalCost: number;
  averageCost: number;
}

export interface MaintenanceCalendarEvent {
  id: string;
  title: string;
  date: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  machineId: string;
  machineName?: string;
}
