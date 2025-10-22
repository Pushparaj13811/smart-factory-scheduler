// Route configurations with permissions

import { UserRole } from './roles';
import type { Permission } from '@/types/permissions.types';

export interface RouteConfig {
  path: string;
  title: string;
  translationKey?: string; // i18n key for translated title
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
    translationKey: 'navigation:menu.dashboard',
    permissions: ['DASHBOARD.view'],
    icon: 'LayoutDashboard',
    showInNav: true,
  },

  // System Admin Routes
  {
    path: '/system',
    title: 'System',
    translationKey: 'navigation:menu.system',
    roles: [UserRole.SYSTEM_ADMIN],
    icon: 'Settings',
    showInNav: true,
    isSystemRoute: true,
    children: [
      {
        path: '/system/industries',
        title: 'Industries',
        translationKey: 'navigation:menu.industries',
        permissions: ['INDUSTRIES.view'],
        icon: 'Building2',
        showInNav: true,
      },
      {
        path: '/system/subscriptions',
        title: 'Subscriptions',
        translationKey: 'navigation:menu.subscriptions',
        permissions: ['SUBSCRIPTIONS.view'],
        icon: 'CreditCard',
        showInNav: true,
      },
      {
        path: '/system/analytics',
        title: 'Platform Analytics',
        translationKey: 'navigation:menu.platformAnalytics',
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
    translationKey: 'navigation:menu.machines',
    permissions: ['MACHINES.view'],
    icon: 'Cog',
    showInNav: true,
  },
  {
    path: '/components',
    title: 'Components',
    translationKey: 'navigation:menu.components',
    permissions: ['COMPONENTS.view'],
    icon: 'Package',
    showInNav: true,
  },
  {
    path: '/raw-materials',
    title: 'Raw Materials',
    translationKey: 'navigation:menu.rawMaterials',
    permissions: ['RAW_MATERIALS.view'],
    icon: 'Container',
    showInNav: true,
  },
  {
    path: '/orders',
    title: 'Orders',
    translationKey: 'navigation:menu.orders',
    permissions: ['ORDERS.view'],
    icon: 'ShoppingCart',
    showInNav: true,
  },
  {
    path: '/schedule',
    title: 'Schedule',
    translationKey: 'navigation:menu.schedule',
    permissions: ['SCHEDULE.view'],
    icon: 'Calendar',
    showInNav: true,
  },
  {
    path: '/maintenance',
    title: 'Maintenance',
    translationKey: 'navigation:menu.maintenance',
    permissions: ['MAINTENANCE.view'],
    icon: 'Wrench',
    showInNav: true,
  },
  {
    path: '/users',
    title: 'User Management',
    translationKey: 'navigation:menu.users',
    permissions: ['USERS.view'],
    icon: 'Users',
    showInNav: true,
  },
  {
    path: '/reports',
    title: 'Reports & Analytics',
    translationKey: 'navigation:menu.reports',
    permissions: ['REPORTS.view'],
    icon: 'FileText',
    showInNav: true,
  },
  {
    path: '/settings',
    title: 'Settings',
    translationKey: 'navigation:menu.settings',
    permissions: ['SETTINGS.view'],
    icon: 'Settings',
    showInNav: true,
  },
  {
    path: '/profile',
    title: 'Profile',
    translationKey: 'navigation:menu.profile',
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
