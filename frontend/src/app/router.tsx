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
import ComponentsPage from '@/pages/ComponentsPage';
import RawMaterialsPage from '@/pages/RawMaterialsPage';
import OrdersPage from '@/pages/OrdersPage';
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
      // Other feature routes (placeholders)
      {
        path: '/components',
        element: <ComponentsPage />,
      },
      {
        path: '/raw-materials',
        element: <RawMaterialsPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
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
