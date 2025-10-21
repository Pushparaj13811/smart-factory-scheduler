// Route configurations with permissions

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
  { path: '/forgot-password', title: 'Forgot Password', showInNav: false },
  { path: '/reset-password', title: 'Reset Password', showInNav: false },

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
  {
    path: '/profile',
    title: 'Profile',
    icon: 'User',
    showInNav: false,
  },
];

/**
 * Filter routes based on user permissions
 */
export function getAuthorizedRoutes(
  routes: RouteConfig[],
  checkPermission: (permission: Permission) => boolean,
  checkRole: (roles: UserRole[]) => boolean
): RouteConfig[] {
  return routes
    .filter((route) => {
      // Check role requirement
      if (route.roles && !checkRole(route.roles)) {
        return false;
      }

      // Check permission requirement
      if (route.permissions && !route.permissions.some((p) => checkPermission(p))) {
        return false;
      }

      return true;
    })
    .map((route) => ({
      ...route,
      children: route.children
        ? getAuthorizedRoutes(route.children, checkPermission, checkRole)
        : undefined,
    }));
}
