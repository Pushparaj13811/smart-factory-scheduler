// RoleGate component for conditional rendering based on user roles

import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/constants/roles';

interface RoleGateProps {
  children: React.ReactNode;
  roles: UserRole | UserRole[];
  fallback?: React.ReactNode;
}

export function RoleGate({ children, roles, fallback = null }: RoleGateProps) {
  const { hasAnyRole } = useAuth();

  const roleArray = Array.isArray(roles) ? roles : [roles];

  if (!hasAnyRole(roleArray)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
