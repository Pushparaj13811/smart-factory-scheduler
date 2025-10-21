// Machine types and interfaces

export const MachineStatus = {
  RUNNING: 'running',
  IDLE: 'idle',
  MAINTENANCE: 'maintenance',
  OFFLINE: 'offline',
  ERROR: 'error',
  SETUP: 'setup',
} as const;

export type MachineStatus = (typeof MachineStatus)[keyof typeof MachineStatus];

export const MachineType = {
  CNC: 'cnc',
  LATHE: 'lathe',
  MILL: 'mill',
  DRILL: 'drill',
  GRINDER: 'grinder',
  PRESS: 'press',
  WELDING: 'welding',
  CUTTING: 'cutting',
  ASSEMBLY: 'assembly',
  PACKAGING: 'packaging',
  OTHER: 'other',
} as const;

export type MachineType = (typeof MachineType)[keyof typeof MachineType];

export const MaintenanceType = {
  SCHEDULED: 'scheduled',
  PREVENTIVE: 'preventive',
  CORRECTIVE: 'corrective',
  EMERGENCY: 'emergency',
} as const;

export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

export const MaintenanceStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type MaintenanceStatus = (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

export interface Machine {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  type: MachineType;
  status: MachineStatus;
  capacity: number;
  location: string;
  purchaseDate: string;
  installationDate?: string;
  warrantyExpiry?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  description?: string;
  specifications?: Record<string, string | number>;
  industryId: string;
  createdAt: string;
  updatedAt: string;

  // Performance metrics
  metrics?: MachineMetrics;

  // Maintenance history
  maintenanceHistory?: MaintenanceRecord[];
}

export interface MachineMetrics {
  utilization: number; // Percentage
  efficiency: number; // Percentage
  totalRuntime: number; // Hours
  totalDowntime: number; // Hours
  averageUptime: number; // Percentage
  mtbf?: number; // Mean Time Between Failures (hours)
  mttr?: number; // Mean Time To Repair (hours)
  productionCount: number;
  lastProductionDate?: string;
}

export interface MaintenanceRecord {
  id: string;
  machineId: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate?: string;
  description: string;
  performedBy?: string;
  cost?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMachineInput {
  name: string;
  model: string;
  manufacturer: string;
  type: MachineType;
  capacity: number;
  location: string;
  purchaseDate: string;
  installationDate?: string;
  warrantyExpiry?: string;
  description?: string;
  specifications?: Record<string, string | number>;
}

export interface UpdateMachineInput {
  name?: string;
  model?: string;
  manufacturer?: string;
  type?: MachineType;
  status?: MachineStatus;
  capacity?: number;
  location?: string;
  purchaseDate?: string;
  installationDate?: string;
  warrantyExpiry?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  description?: string;
  specifications?: Record<string, string | number>;
}

export interface MachineFilters {
  status?: MachineStatus[];
  type?: MachineType[];
  location?: string[];
  search?: string;
}

export interface MachinesResponse {
  machines: Machine[];
  total: number;
  page: number;
  pageSize: number;
}

export interface MachineStats {
  total: number;
  running: number;
  idle: number;
  maintenance: number;
  offline: number;
  averageUtilization: number;
  averageEfficiency: number;
}
