// usePermission hook for resource-specific permission checks

import { useAuth } from './useAuth';
import { UserRole } from '@/constants/roles';
import type { Permission, Resource, Action } from '@/types/permissions.types';
import { getResourcePermissions } from '@/constants/permissions';

export function usePermission(resource?: Resource) {
  const { user, can, canAny, canAll } = useAuth();

  // If no resource specified, return basic permission functions
  if (!resource) {
    return { can, canAny, canAll };
  }

  // Get all permissions for this resource
  const permissions = user ? getResourcePermissions(user.role as UserRole, resource) : [];

  // Check specific actions
  const canView = permissions.includes('view');
  const canCreate = permissions.includes('create');
  const canUpdate = permissions.includes('update');
  const canDelete = permissions.includes('delete');
  const canManage = permissions.includes('manage');

  /**
   * Check if user can perform a specific action on this resource
   */
  const canPerform = (action: Action): boolean => {
    return can(`${resource}.${action}` as Permission);
  };

  return {
    // Generic permission checks
    can,
    canAny,
    canAll,

    // Resource-specific checks
    canPerform,
    canView,
    canCreate,
    canUpdate,
    canDelete,
    canManage,

    // All permissions for this resource
    permissions,
  };
}
