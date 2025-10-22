# RBAC (Role-Based Access Control) Implementation Plan

## 1. Role Definitions

### 1.1 User Roles

```typescript
// src/constants/roles.ts

export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  INDUSTRY_OWNER = 'INDUSTRY_OWNER',
  ADMINISTRATOR = 'ADMINISTRATOR',
  SUPERVISOR = 'SUPERVISOR',
  WORKER = 'WORKER',
}

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SYSTEM_ADMIN]: 'System Administrator',
  [UserRole.INDUSTRY_OWNER]: 'Industry Owner',
  [UserRole.ADMINISTRATOR]: 'Administrator',
  [UserRole.SUPERVISOR]: 'Supervisor',
  [UserRole.WORKER]: 'Worker/Operator',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SYSTEM_ADMIN]: 5,
  [UserRole.INDUSTRY_OWNER]: 4,
  [UserRole.ADMINISTRATOR]: 3,
  [UserRole.SUPERVISOR]: 2,
  [UserRole.WORKER]: 1,
};
```

### 1.2 Role Descriptions

| Role | Scope | Access Level | Description |
|------|-------|--------------|-------------|
| **System Administrator** | Platform-wide | Full system access | Manages multiple industries, subscriptions, platform settings |
| **Industry Owner** | Industry-specific | Full industry access | Owns the industry account, manages subscription and administrators |
| **Administrator** | Industry-specific | High-level operations | Manages machines, components, orders, and employees |
| **Supervisor** | Industry-specific | Team management | Manages teams, monitors schedules, approves tasks |
| **Worker** | Industry-specific | Personal tasks | Views personal schedule, updates task status |

## 2. Permission System

### 2.1 Permission Structure

```typescript
// src/types/permissions.types.ts

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
  role: UserRole;
  permissions: Permission[];
  description: string;
}
```

### 2.2 Permission Matrix

```typescript
// src/constants/permissions.ts

import { UserRole, type Permission } from '@/types/permissions.types';

export const PERMISSIONS: Record<UserRole, Permission[]> = {

  // ============ SYSTEM ADMINISTRATOR ============
  [UserRole.SYSTEM_ADMIN]: [
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
  [UserRole.WORKER]: [
    'DASHBOARD.view',
    'SCHEDULE.view',
  ],
};

// Helper function to check permission
export function hasPermission(
  userRole: UserRole,
  permission: Permission
): boolean {
  return PERMISSIONS[userRole]?.includes(permission) ?? false;
}

// Helper to check multiple permissions (OR logic)
export function hasAnyPermission(
  userRole: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

// Helper to check multiple permissions (AND logic)
export function hasAllPermissions(
  userRole: UserRole,
  permissions: Permission[]
): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

// Get all permissions for a resource
export function getResourcePermissions(
  userRole: UserRole,
  resource: Resource
): Action[] {
  const userPermissions = PERMISSIONS[userRole] || [];
  const actions: Action[] = [];

  userPermissions.forEach(permission => {
    if (permission.startsWith(`${resource}.`)) {
      const action = permission.split('.')[1] as Action;
      actions.push(action);
    }
  });

  return actions;
}
```

## 3. RBAC Hooks

### 3.1 useAuth Hook

```typescript
// src/hooks/useAuth.ts

import { useAuthStore } from '@/stores/auth.store';
import type { UserRole, Permission } from '@/types/permissions.types';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/constants/permissions';

export function useAuth() {
  const { user, token, login, logout, refreshToken } = useAuthStore();

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user.role, permissions);
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const isSystemAdmin = (): boolean => {
    return user?.role === UserRole.SYSTEM_ADMIN;
  };

  const isIndustryOwner = (): boolean => {
    return user?.role === UserRole.INDUSTRY_OWNER;
  };

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    refreshToken,

    // Permission checks
    can: checkPermission,
    canAny: checkAnyPermission,
    canAll: checkAllPermissions,

    // Role checks
    hasRole,
    hasAnyRole,
    isSystemAdmin,
    isIndustryOwner,
  };
}
```

### 3.2 usePermission Hook

```typescript
// src/hooks/usePermission.ts

import { useAuth } from './useAuth';
import type { Permission, Resource, Action } from '@/types/permissions.types';
import { getResourcePermissions } from '@/constants/permissions';

export function usePermission(resource?: Resource) {
  const { user, can, canAny, canAll } = useAuth();

  if (!resource) {
    return { can, canAny, canAll };
  }

  const permissions = user ? getResourcePermissions(user.role, resource) : [];

  const canView = permissions.includes('view');
  const canCreate = permissions.includes('create');
  const canUpdate = permissions.includes('update');
  const canDelete = permissions.includes('delete');
  const canManage = permissions.includes('manage');

  const canPerform = (action: Action): boolean => {
    return can(`${resource}.${action}` as Permission);
  };

  return {
    can,
    canAny,
    canAll,
    canPerform,
    canView,
    canCreate,
    canUpdate,
    canDelete,
    canManage,
    permissions,
  };
}
```

## 4. Route Protection

### 4.1 ProtectedRoute Component

```typescript
// src/components/guards/ProtectedRoute/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { Permission } from '@/types/permissions.types';
import { UserRole } from '@/constants/roles';

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
    const hasPermission = requireAll
      ? canAll(permissions)
      : canAny(permissions);

    if (!hasPermission) {
      return fallback ? <>{fallback}</> : <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
```

### 4.2 PermissionGate Component

```typescript
// src/components/guards/PermissionGate/PermissionGate.tsx

import { useAuth } from '@/hooks/useAuth';
import type { Permission } from '@/types/permissions.types';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: Permission | Permission[];
  requireAll?: boolean;
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

  const hasPermission = requireAll
    ? canAll(permissionArray)
    : canAny(permissionArray);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

### 4.3 RoleGate Component

```typescript
// src/components/guards/RoleGate/RoleGate.tsx

import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/constants/roles';

interface RoleGateProps {
  children: React.ReactNode;
  roles: UserRole | UserRole[];
  fallback?: React.ReactNode;
}

export function RoleGate({
  children,
  roles,
  fallback = null,
}: RoleGateProps) {
  const { hasAnyRole } = useAuth();

  const roleArray = Array.isArray(roles) ? roles : [roles];

  if (!hasAnyRole(roleArray)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

## 5. Route Configuration with RBAC

### 5.1 Route Definitions

```typescript
// src/constants/routes.ts

import { UserRole } from './roles';
import type { Permission } from '@/types/permissions.types';

export interface RouteConfig {
  path: string;
  title: string;
  permissions?: Permission[];
  roles?: UserRole[];
  icon?: string;
  children?: RouteConfig[];
  showInNav?: boolean;
  isSystemRoute?: boolean; // For system admin routes
}

export const ROUTES: RouteConfig[] = [
  // Public routes
  { path: '/login', title: 'Login', showInNav: false },
  { path: '/signup', title: 'Sign Up', showInNav: false },

  // Dashboard - Different content based on role
  {
    path: '/',
    title: 'Dashboard',
    permissions: ['DASHBOARD.view'],
    icon: 'LayoutDashboard',
    showInNav: true,
  },

  // System Admin Routes
  {
    path: '/system',
    title: 'System',
    roles: [UserRole.SYSTEM_ADMIN],
    icon: 'Settings',
    showInNav: true,
    isSystemRoute: true,
    children: [
      {
        path: '/system/industries',
        title: 'Industries',
        permissions: ['INDUSTRIES.view'],
        icon: 'Building2',
        showInNav: true,
      },
      {
        path: '/system/subscriptions',
        title: 'Subscriptions',
        permissions: ['SUBSCRIPTIONS.view'],
        icon: 'CreditCard',
        showInNav: true,
      },
      {
        path: '/system/analytics',
        title: 'Platform Analytics',
        permissions: ['PLATFORM_ANALYTICS.view'],
        icon: 'BarChart3',
        showInNav: true,
      },
    ],
  },

  // Industry Routes
  {
    path: '/machines',
    title: 'Machines',
    permissions: ['MACHINES.view'],
    icon: 'Cog',
    showInNav: true,
  },
  {
    path: '/components',
    title: 'Components',
    permissions: ['COMPONENTS.view'],
    icon: 'Package',
    showInNav: true,
  },
  {
    path: '/raw-materials',
    title: 'Raw Materials',
    permissions: ['RAW_MATERIALS.view'],
    icon: 'Container',
    showInNav: true,
  },
  {
    path: '/orders',
    title: 'Orders',
    permissions: ['ORDERS.view'],
    icon: 'ShoppingCart',
    showInNav: true,
  },
  {
    path: '/schedule',
    title: 'Schedule',
    permissions: ['SCHEDULE.view'],
    icon: 'Calendar',
    showInNav: true,
  },
  {
    path: '/maintenance',
    title: 'Maintenance',
    permissions: ['MAINTENANCE.view'],
    icon: 'Wrench',
    showInNav: true,
  },
  {
    path: '/users',
    title: 'User Management',
    permissions: ['USERS.view'],
    icon: 'Users',
    showInNav: true,
  },
  {
    path: '/reports',
    title: 'Reports & Analytics',
    permissions: ['REPORTS.view'],
    icon: 'FileText',
    showInNav: true,
  },
  {
    path: '/settings',
    title: 'Settings',
    permissions: ['SETTINGS.view'],
    icon: 'Settings',
    showInNav: true,
  },
];

// Helper to filter routes based on user permissions
export function getAuthorizedRoutes(
  routes: RouteConfig[],
  checkPermission: (permission: Permission) => boolean,
  checkRole: (roles: UserRole[]) => boolean
): RouteConfig[] {
  return routes.filter(route => {
    // Check role requirement
    if (route.roles && !checkRole(route.roles)) {
      return false;
    }

    // Check permission requirement
    if (route.permissions && !route.permissions.some(p => checkPermission(p))) {
      return false;
    }

    return true;
  }).map(route => ({
    ...route,
    children: route.children
      ? getAuthorizedRoutes(route.children, checkPermission, checkRole)
      : undefined,
  }));
}
```

### 5.2 Router Setup with Role-Based Content

```typescript
// src/app/router.tsx

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/guards/ProtectedRoute';
import { AppLayout } from '@/components/layouts/AppLayout';
import { AuthLayout } from '@/components/layouts/AuthLayout';

// Lazy load pages
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'));
const DashboardRouter = lazy(() => import('@/features/dashboard/DashboardRouter'));
const MachinesPage = lazy(() => import('@/features/machines/pages/MachinesPage'));
// ... other pages

export const router = createBrowserRouter([
  // Auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },

  // Protected app routes
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <DashboardRouter />, // Role-based dashboard
      },
      {
        path: '/machines',
        element: (
          <ProtectedRoute permissions={['MACHINES.view']}>
            <MachinesPage />
          </ProtectedRoute>
        ),
      },
      // ... other routes
    ],
  },

  // Fallback
  { path: '*', element: <Navigate to="/" replace /> },
]);
```

## 6. Role-Based Dashboard Router

```typescript
// src/features/dashboard/DashboardRouter.tsx

import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/constants/roles';

import SystemAdminDashboard from './pages/SystemAdminDashboard';
import IndustryOwnerDashboard from './pages/IndustryOwnerDashboard';
import AdministratorDashboard from './pages/AdministratorDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import WorkerDashboard from './pages/WorkerDashboard';

export default function DashboardRouter() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case UserRole.SYSTEM_ADMIN:
      return <SystemAdminDashboard />;
    case UserRole.INDUSTRY_OWNER:
      return <IndustryOwnerDashboard />;
    case UserRole.ADMINISTRATOR:
      return <AdministratorDashboard />;
    case UserRole.SUPERVISOR:
      return <SupervisorDashboard />;
    case UserRole.WORKER:
      return <WorkerDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
}
```

## 7. Component-Level Permission Usage

### 7.1 Conditional Rendering

```typescript
// Example: Machine page with conditional actions

import { usePermission } from '@/hooks/usePermission';
import { PermissionGate } from '@/components/guards/PermissionGate';

function MachinesPage() {
  const { canCreate, canUpdate, canDelete } = usePermission('MACHINES');

  return (
    <div>
      <PageHeader title="Machines">
        <PermissionGate permissions={['MACHINES.create']}>
          <Button onClick={handleCreate}>Create Machine</Button>
        </PermissionGate>
      </PageHeader>

      <DataTable
        data={machines}
        columns={columns}
        actions={(row) => [
          canUpdate && {
            label: 'Edit',
            onClick: () => handleEdit(row),
          },
          canDelete && {
            label: 'Delete',
            onClick: () => handleDelete(row),
          },
        ].filter(Boolean)}
      />
    </div>
  );
}
```

### 7.2 Navigation Menu Filtering

```typescript
// src/components/layouts/Sidebar/Sidebar.tsx

import { useAuth } from '@/hooks/useAuth';
import { ROUTES, getAuthorizedRoutes } from '@/constants/routes';

function Sidebar() {
  const { can, hasAnyRole } = useAuth();

  const authorizedRoutes = getAuthorizedRoutes(
    ROUTES.filter(r => r.showInNav),
    can,
    hasAnyRole
  );

  return (
    <nav>
      {authorizedRoutes.map(route => (
        <NavLink key={route.path} to={route.path}>
          {route.title}
        </NavLink>
      ))}
    </nav>
  );
}
```

## 8. Auth Store Implementation

```typescript
// src/stores/auth.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@/constants/roles';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  industryId?: string; // null for SYSTEM_ADMIN
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;

  setAuth: (user: User, token: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,

      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken }),

      clearAuth: () =>
        set({ user: null, token: null, refreshToken: null }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
```

## 9. Testing RBAC

### 9.1 Permission Tests

```typescript
// src/constants/__tests__/permissions.test.ts

import { describe, it, expect } from 'vitest';
import { hasPermission, hasAllPermissions } from '../permissions';
import { UserRole } from '../roles';

describe('Permission System', () => {
  it('should grant SYSTEM_ADMIN all system permissions', () => {
    expect(hasPermission(UserRole.SYSTEM_ADMIN, 'INDUSTRIES.view')).toBe(true);
    expect(hasPermission(UserRole.SYSTEM_ADMIN, 'SUBSCRIPTIONS.manage')).toBe(true);
  });

  it('should deny WORKER access to machine management', () => {
    expect(hasPermission(UserRole.WORKER, 'MACHINES.create')).toBe(false);
    expect(hasPermission(UserRole.WORKER, 'MACHINES.delete')).toBe(false);
  });

  it('should allow ADMINISTRATOR machine CRUD but not manage', () => {
    expect(hasPermission(UserRole.ADMINISTRATOR, 'MACHINES.create')).toBe(true);
    expect(hasPermission(UserRole.ADMINISTRATOR, 'MACHINES.manage')).toBe(false);
  });
});
```

## 10. Security Best Practices

### 10.1 Client-Side RBAC is for UX Only

⚠️ **CRITICAL**: Client-side permission checks are for **user experience only**. They:
- Hide/show UI elements
- Prevent unnecessary API calls
- Provide better UX

**They do NOT provide security**. All security must be enforced on the backend.

### 10.2 Backend Verification Required

Every API endpoint must:
1. Verify JWT token
2. Check user role
3. Verify permissions
4. Validate tenant isolation

### 10.3 Token Security

- Store tokens securely (httpOnly cookies preferred)
- Implement token refresh mechanism
- Auto-logout on token expiry
- Clear sensitive data on logout

## 11. Summary

This RBAC implementation provides:

✅ **Type-Safe**: Full TypeScript support
✅ **Flexible**: Permission and role-based checks
✅ **Reusable**: Hooks and components for consistent usage
✅ **Maintainable**: Centralized permission definitions
✅ **Testable**: Easy to unit test permissions
✅ **Scalable**: Easy to add new roles/permissions
✅ **User-Friendly**: Proper UX based on user capabilities
