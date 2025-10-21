// Permission matrix for RBAC

import { UserRole } from './roles';
import type { Permission } from '@/types/permissions.types';

export const PERMISSIONS: Record<UserRole, Permission[]> = {
  // ============ SYSTEM ADMINISTRATOR ============
  [UserRole.SYSTEM_ADMIN]: [
    // Dashboard access
    'DASHBOARD.view',

    // System-level access
    'INDUSTRIES.view',
    'INDUSTRIES.create',
    'INDUSTRIES.update',
    'INDUSTRIES.delete',
    'INDUSTRIES.manage',

    'SUBSCRIPTIONS.view',
    'SUBSCRIPTIONS.create',
    'SUBSCRIPTIONS.update',
    'SUBSCRIPTIONS.delete',
    'SUBSCRIPTIONS.manage',

    'PLATFORM_ANALYTICS.view',
    'PLATFORM_ANALYTICS.manage',

    'SYSTEM_SETTINGS.view',
    'SYSTEM_SETTINGS.update',
    'SYSTEM_SETTINGS.manage',
  ],

  // ============ INDUSTRY OWNER ============
  [UserRole.INDUSTRY_OWNER]: [
    // Full industry access
    'DASHBOARD.view',

    'MACHINES.view',
    'MACHINES.create',
    'MACHINES.update',
    'MACHINES.delete',
    'MACHINES.manage',

    'COMPONENTS.view',
    'COMPONENTS.create',
    'COMPONENTS.update',
    'COMPONENTS.delete',
    'COMPONENTS.manage',

    'RAW_MATERIALS.view',
    'RAW_MATERIALS.create',
    'RAW_MATERIALS.update',
    'RAW_MATERIALS.delete',
    'RAW_MATERIALS.manage',

    'ORDERS.view',
    'ORDERS.create',
    'ORDERS.update',
    'ORDERS.delete',
    'ORDERS.manage',

    'SCHEDULE.view',
    'SCHEDULE.manage',

    'MAINTENANCE.view',
    'MAINTENANCE.create',
    'MAINTENANCE.update',
    'MAINTENANCE.delete',
    'MAINTENANCE.manage',

    'USERS.view',
    'USERS.create',
    'USERS.update',
    'USERS.delete',
    'USERS.manage',

    'REPORTS.view',
    'REPORTS.manage',

    'SETTINGS.view',
    'SETTINGS.update',
    'SETTINGS.manage',
  ],

  // ============ ADMINISTRATOR ============
  [UserRole.ADMINISTRATOR]: [
    'DASHBOARD.view',

    'MACHINES.view',
    'MACHINES.create',
    'MACHINES.update',
    'MACHINES.delete',

    'COMPONENTS.view',
    'COMPONENTS.create',
    'COMPONENTS.update',
    'COMPONENTS.delete',

    'RAW_MATERIALS.view',
    'RAW_MATERIALS.create',
    'RAW_MATERIALS.update',
    'RAW_MATERIALS.delete',

    'ORDERS.view',
    'ORDERS.create',
    'ORDERS.update',
    'ORDERS.delete',

    'SCHEDULE.view',

    'MAINTENANCE.view',
    'MAINTENANCE.create',
    'MAINTENANCE.update',
    'MAINTENANCE.delete',

    'USERS.view',
    'USERS.create',
    'USERS.update',
    'USERS.delete',

    'REPORTS.view',

    'SETTINGS.view',
  ],

  // ============ SUPERVISOR ============
  [UserRole.SUPERVISOR]: [
    'DASHBOARD.view',

    'MACHINES.view',

    'COMPONENTS.view',

    'RAW_MATERIALS.view',

    'ORDERS.view',
    'ORDERS.create',

    'SCHEDULE.view',

    'MAINTENANCE.view',
    'MAINTENANCE.create',

    'USERS.view',

    'REPORTS.view',
  ],

  // ============ WORKER ============
  [UserRole.WORKER]: ['DASHBOARD.view', 'SCHEDULE.view'],
};

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return PERMISSIONS[userRole]?.includes(permission) ?? false;
}

/**
 * Check if a user role has any of the specified permissions (OR logic)
 */
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(userRole, permission));
}

/**
 * Check if a user role has all of the specified permissions (AND logic)
 */
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(userRole, permission));
}

/**
 * Get all permissions for a resource
 */
export function getResourcePermissions(userRole: UserRole, resource: string): string[] {
  const userPermissions = PERMISSIONS[userRole] || [];
  const actions: string[] = [];

  userPermissions.forEach((permission) => {
    if (permission.startsWith(`${resource}.`)) {
      const action = permission.split('.')[1];
      actions.push(action);
    }
  });

  return actions;
}
