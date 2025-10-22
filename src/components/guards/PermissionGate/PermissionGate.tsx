// PermissionGate component for conditional rendering based on permissions

import { useAuth } from '@/hooks/useAuth';
import type { Permission } from '@/types/permissions.types';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: Permission | Permission[];
  requireAll?: boolean; // AND vs OR logic
  fallback?: React.ReactNode;
}

export function PermissionGate({
  children,
  permissions,
  requireAll = false,
  fallback = null,
}: PermissionGateProps) {
  const { canAny, canAll } = useAuth();

  const permissionArray = Array.isArray(permissions) ? permissions : [permissions];

  const hasPermission = requireAll ? canAll(permissionArray) : canAny(permissionArray);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
