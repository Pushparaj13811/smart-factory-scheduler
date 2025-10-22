// ProtectedRoute component for route-level protection

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/constants/roles';
import type { Permission } from '@/types/permissions.types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permission[];
  roles?: UserRole[];
  requireAll?: boolean; // For permissions: AND vs OR logic
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  permissions = [],
  roles = [],
  requireAll = false,
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, canAny, canAll, hasAnyRole } = useAuth();
  const location = useLocation();

  // Not authenticated -> redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements
  if (roles.length > 0 && !hasAnyRole(roles)) {
    return fallback ? <>{fallback}</> : <Navigate to="/unauthorized" replace />;
  }

  // Check permission requirements
  if (permissions.length > 0) {
    const hasPermission = requireAll ? canAll(permissions) : canAny(permissions);

    if (!hasPermission) {
      return fallback ? <>{fallback}</> : <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
