// Permission system types

export type Action = 'view' | 'create' | 'update' | 'delete' | 'manage';

export type Resource =
  // System Admin Resources
  | 'INDUSTRIES'
  | 'SUBSCRIPTIONS'
  | 'PLATFORM_ANALYTICS'
  | 'SYSTEM_SETTINGS'

  // Industry Resources
  | 'DASHBOARD'
  | 'MACHINES'
  | 'COMPONENTS'
  | 'RAW_MATERIALS'
  | 'ORDERS'
  | 'SCHEDULE'
  | 'MAINTENANCE'
  | 'USERS'
  | 'REPORTS'
  | 'SETTINGS';

export type Permission = `${Resource}.${Action}`;

export interface RolePermissions {
  role: string;
  permissions: Permission[];
  description: string;
}
