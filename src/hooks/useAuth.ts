// useAuth hook for authentication and authorization

import { useAuthStore } from '@/stores/auth.store';
import { UserRole } from '@/constants/roles';
import type { Permission } from '@/types/permissions.types';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from '@/constants/permissions';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth, updateUser } = useAuthStore();

  /**
   * Check if user has a specific permission
   */
  const can = (permission: Permission): boolean => {
    if (!user?.role) return false;
    return hasPermission(user.role as UserRole, permission);
  };

  /**
   * Check if user has any of the specified permissions (OR logic)
   */
  const canAny = (permissions: Permission[]): boolean => {
    if (!user?.role) return false;
    return hasAnyPermission(user.role as UserRole, permissions);
  };

  /**
   * Check if user has all of the specified permissions (AND logic)
   */
  const canAll = (permissions: Permission[]): boolean => {
    if (!user?.role) return false;
    return hasAllPermissions(user.role as UserRole, permissions);
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role as UserRole) : false;
  };

  /**
   * Check if user is system admin
   */
  const isSystemAdmin = (): boolean => {
    return user?.role === UserRole.SYSTEM_ADMIN;
  };

  /**
   * Check if user is industry owner
   */
  const isIndustryOwner = (): boolean => {
    return user?.role === UserRole.INDUSTRY_OWNER;
  };

  /**
   * Check if user is administrator
   */
  const isAdministrator = (): boolean => {
    return user?.role === UserRole.ADMINISTRATOR;
  };

  /**
   * Check if user is supervisor
   */
  const isSupervisor = (): boolean => {
    return user?.role === UserRole.SUPERVISOR;
  };

  /**
   * Check if user is worker
   */
  const isWorker = (): boolean => {
    return user?.role === UserRole.WORKER;
  };

  return {
    // Auth state
    user,
    token,
    isAuthenticated,

    // Auth actions
    setAuth,
    clearAuth,
    updateUser,

    // Permission checks
    can,
    canAny,
    canAll,

    // Role checks
    hasRole,
    hasAnyRole,
    isSystemAdmin,
    isIndustryOwner,
    isAdministrator,
    isSupervisor,
    isWorker,
  };
}
