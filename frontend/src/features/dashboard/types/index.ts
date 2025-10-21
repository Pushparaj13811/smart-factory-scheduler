// Dashboard-specific types

export interface DashboardMetrics {
  totalMachines?: number;
  activeMachines?: number;
  totalComponents?: number;
  activeOrders?: number;
  completedOrders?: number;
  efficiency?: number;
  completedTasks?: number;
  pendingMaintenance?: number;
  workloadUtilization?: number;
  assignedTasks?: number;
  totalIndustries?: number;
  totalUsers?: number;
  systemUptime?: number;
  trends?: {
    machinesTrend?: number;
    ordersTrend?: number;
    efficiencyTrend?: number;
    tasksTrend?: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'order' | 'machine' | 'task' | 'maintenance' | 'user' | 'system';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  icon?: string;
}

export interface ScheduleTask {
  id: string;
  title: string;
  description?: string;
  machineId?: string;
  machineName?: string;
  componentId?: string;
  componentName?: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

export interface MachineStatusSummary {
  running: number;
  idle: number;
  maintenance: number;
  offline: number;
  total: number;
  details?: Array<{
    id: string;
    name: string;
    status: 'running' | 'idle' | 'maintenance' | 'offline';
    currentTask?: string;
    efficiency?: number;
  }>;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface ProductionTrendData {
  date: string;
  production: number;
  target?: number;
}

export interface EfficiencyData {
  category: string;
  efficiency: number;
  target?: number;
}
