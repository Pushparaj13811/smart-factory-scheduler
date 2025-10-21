// Router configuration

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/guards/ProtectedRoute';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AppLayout } from '@/components/layouts/AppLayout';
import { RouteError } from '@/components/common/RouteError';

// Auth pages
import LoginPage from '@/features/auth/pages/LoginPage';
import SignupPage from '@/features/auth/pages/SignupPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

// Other pages
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import HomePage from '@/pages/HomePage';
import SchedulePage from '@/pages/SchedulePage';
import MaintenancePage from '@/pages/MaintenancePage';
import UsersPage from '@/pages/UsersPage';
import ReportsPage from '@/pages/ReportsPage';
import SettingsPage from '@/pages/SettingsPage';

// Machine pages
import {
  MachinesPage,
  MachineCreatePage,
  MachineEditPage,
  MachineDetailsPage,
} from '@/features/machines/pages';

// Component pages
import {
  ComponentsPage,
  ComponentCreatePage,
  ComponentEditPage,
  ComponentDetailsPage,
} from '@/features/components/pages';

// Raw Material pages
import {
  RawMaterialsPage,
  RawMaterialCreatePage,
  RawMaterialEditPage,
  RawMaterialDetailsPage,
} from '@/features/raw-materials/pages';

// Order pages
import {
  OrdersPage,
  OrderCreatePage,
  OrderEditPage,
  OrderDetailsPage,
} from '@/features/orders/pages';

// System admin pages
import {
  IndustriesPage,
  SubscriptionsPage,
  AnalyticsPage,
} from '@/features/system/pages';

export const router = createBrowserRouter([
  // Auth routes (with AuthLayout)
  {
    element: <AuthLayout />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },

  // Unauthorized page (no layout)
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
    errorElement: <RouteError />,
  },

  // Protected routes (with AppLayout)
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteError />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // Machine Management routes
      {
        path: '/machines',
        element: <MachinesPage />,
      },
      {
        path: '/machines/create',
        element: <MachineCreatePage />,
      },
      {
        path: '/machines/:id',
        element: <MachineDetailsPage />,
      },
      {
        path: '/machines/:id/edit',
        element: <MachineEditPage />,
      },
      // Component Management routes
      {
        path: '/components',
        element: <ComponentsPage />,
      },
      {
        path: '/components/create',
        element: <ComponentCreatePage />,
      },
      {
        path: '/components/:id',
        element: <ComponentDetailsPage />,
      },
      {
        path: '/components/:id/edit',
        element: <ComponentEditPage />,
      },
      // Raw Material Management routes
      {
        path: '/raw-materials',
        element: <RawMaterialsPage />,
      },
      {
        path: '/raw-materials/create',
        element: <RawMaterialCreatePage />,
      },
      {
        path: '/raw-materials/:id',
        element: <RawMaterialDetailsPage />,
      },
      {
        path: '/raw-materials/:id/edit',
        element: <RawMaterialEditPage />,
      },
      // Order Management routes
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/orders/create',
        element: <OrderCreatePage />,
      },
      {
        path: '/orders/:id',
        element: <OrderDetailsPage />,
      },
      {
        path: '/orders/:id/edit',
        element: <OrderEditPage />,
      },
      // Other feature routes (placeholders)
      {
        path: '/schedule',
        element: <SchedulePage />,
      },
      {
        path: '/maintenance',
        element: <MaintenancePage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      // System Admin routes
      {
        path: '/system/industries',
        element: <IndustriesPage />,
      },
      {
        path: '/system/subscriptions',
        element: <SubscriptionsPage />,
      },
      {
        path: '/system/analytics',
        element: <AnalyticsPage />,
      },
    ],
  },

  // Catch-all redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
