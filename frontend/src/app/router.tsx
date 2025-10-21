// Router configuration with lazy loading

import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/guards/ProtectedRoute';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AppLayout } from '@/components/layouts/AppLayout';
import { RouteError } from '@/components/common/RouteError';
import { PageLoader } from '@/components/common/PageLoader/PageLoader';

// Lazy load all page components
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));

const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const SchedulePage = lazy(() => import('@/pages/SchedulePage'));
const MaintenancePage = lazy(() => import('@/pages/MaintenancePage'));
const UsersPage = lazy(() => import('@/pages/UsersPage'));
const ReportsPage = lazy(() => import('@/pages/ReportsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));

// Machine pages
const MachinesPage = lazy(() => import('@/features/machines/pages/MachinesPage'));
const MachineCreatePage = lazy(() => import('@/features/machines/pages/MachineCreatePage'));
const MachineEditPage = lazy(() => import('@/features/machines/pages/MachineEditPage'));
const MachineDetailsPage = lazy(() => import('@/features/machines/pages/MachineDetailsPage'));

// Component pages
const ComponentsPage = lazy(() => import('@/features/components/pages/ComponentsPage'));
const ComponentCreatePage = lazy(() => import('@/features/components/pages/ComponentCreatePage'));
const ComponentEditPage = lazy(() => import('@/features/components/pages/ComponentEditPage'));
const ComponentDetailsPage = lazy(() => import('@/features/components/pages/ComponentDetailsPage'));

// Raw Material pages
const RawMaterialsPage = lazy(() => import('@/features/raw-materials/pages/RawMaterialsPage'));
const RawMaterialCreatePage = lazy(() => import('@/features/raw-materials/pages/RawMaterialCreatePage'));
const RawMaterialEditPage = lazy(() => import('@/features/raw-materials/pages/RawMaterialEditPage'));
const RawMaterialDetailsPage = lazy(() => import('@/features/raw-materials/pages/RawMaterialDetailsPage'));

// Order pages
const OrdersPage = lazy(() => import('@/features/orders/pages/OrdersPage'));
const OrderCreatePage = lazy(() => import('@/features/orders/pages/OrderCreatePage'));
const OrderEditPage = lazy(() => import('@/features/orders/pages/OrderEditPage'));
const OrderDetailsPage = lazy(() => import('@/features/orders/pages/OrderDetailsPage'));

// User pages
const UserCreatePage = lazy(() => import('@/features/users/pages/UserCreatePage'));
const UserEditPage = lazy(() => import('@/features/users/pages/UserEditPage'));
const UserDetailsPage = lazy(() => import('@/features/users/pages/UserDetailsPage'));

// Maintenance pages
const MaintenanceCreatePage = lazy(() => import('@/features/maintenance/pages/MaintenanceCreatePage'));
const MaintenanceEditPage = lazy(() => import('@/features/maintenance/pages/MaintenanceEditPage'));
const MaintenanceDetailsPage = lazy(() => import('@/features/maintenance/pages/MaintenanceDetailsPage'));

// System admin pages
const IndustriesPage = lazy(() => import('@/features/system/pages/IndustriesPage'));
const SubscriptionsPage = lazy(() => import('@/features/system/pages/SubscriptionsPage'));
const AnalyticsPage = lazy(() => import('@/features/system/pages/AnalyticsPage'));

// Profile page
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));

// Wrapper component with Suspense
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  // Auth routes (with AuthLayout)
  {
    element: <AuthLayout />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/login',
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/signup',
        element: (
          <SuspenseWrapper>
            <SignupPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <SuspenseWrapper>
            <ForgotPasswordPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  // App routes (with AppLayout and ProtectedRoute)
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
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },

      // Machine Management routes
      {
        path: '/machines',
        element: (
          <SuspenseWrapper>
            <MachinesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/machines/create',
        element: (
          <SuspenseWrapper>
            <MachineCreatePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/machines/:id/edit',
        element: (
          <SuspenseWrapper>
            <MachineEditPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/machines/:id',
        element: (
          <SuspenseWrapper>
            <MachineDetailsPage />
          </SuspenseWrapper>
        ),
      },

      // Component Management routes
      {
        path: '/components',
        element: (
          <SuspenseWrapper>
            <ComponentsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/components/create',
        element: (
          <SuspenseWrapper>
            <ComponentCreatePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/components/:id/edit',
        element: (
          <SuspenseWrapper>
            <ComponentEditPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/components/:id',
        element: (
          <SuspenseWrapper>
            <ComponentDetailsPage />
          </SuspenseWrapper>
        ),
      },

      // Raw Materials Management routes
      {
        path: '/raw-materials',
        element: (
          <SuspenseWrapper>
            <RawMaterialsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/raw-materials/create',
        element: (
          <SuspenseWrapper>
            <RawMaterialCreatePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/raw-materials/:id/edit',
        element: (
          <SuspenseWrapper>
            <RawMaterialEditPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/raw-materials/:id',
        element: (
          <SuspenseWrapper>
            <RawMaterialDetailsPage />
          </SuspenseWrapper>
        ),
      },

      // Order Management routes
      {
        path: '/orders',
        element: (
          <SuspenseWrapper>
            <OrdersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/orders/create',
        element: (
          <SuspenseWrapper>
            <OrderCreatePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/orders/:id/edit',
        element: (
          <SuspenseWrapper>
            <OrderEditPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/orders/:id',
        element: (
          <SuspenseWrapper>
            <OrderDetailsPage />
          </SuspenseWrapper>
        ),
      },

      // Schedule Management routes
      {
        path: '/schedule',
        element: (
          <SuspenseWrapper>
            <SchedulePage />
          </SuspenseWrapper>
        ),
      },

      // Maintenance Management routes
      {
        path: '/maintenance',
        element: (
          <SuspenseWrapper>
            <MaintenancePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/maintenance/create',
        element: (
          <SuspenseWrapper>
            <MaintenanceCreatePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/maintenance/:id/edit',
        element: (
          <SuspenseWrapper>
            <MaintenanceEditPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/maintenance/:id',
        element: (
          <SuspenseWrapper>
            <MaintenanceDetailsPage />
          </SuspenseWrapper>
        ),
      },

      // User Management routes
      {
        path: '/users',
        element: (
          <SuspenseWrapper>
            <UsersPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/users/create',
        element: (
          <SuspenseWrapper>
            <UserCreatePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/users/:id/edit',
        element: (
          <SuspenseWrapper>
            <UserEditPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/users/:id',
        element: (
          <SuspenseWrapper>
            <UserDetailsPage />
          </SuspenseWrapper>
        ),
      },

      // Reports routes
      {
        path: '/reports',
        element: (
          <SuspenseWrapper>
            <ReportsPage />
          </SuspenseWrapper>
        ),
      },

      // Settings routes
      {
        path: '/settings',
        element: (
          <SuspenseWrapper>
            <SettingsPage />
          </SuspenseWrapper>
        ),
      },

      // Profile routes
      {
        path: '/profile',
        element: (
          <SuspenseWrapper>
            <ProfilePage />
          </SuspenseWrapper>
        ),
      },

      // System Admin routes
      {
        path: '/system/industries',
        element: (
          <SuspenseWrapper>
            <IndustriesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/system/subscriptions',
        element: (
          <SuspenseWrapper>
            <SubscriptionsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/system/analytics',
        element: (
          <SuspenseWrapper>
            <AnalyticsPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  // Unauthorized route
  {
    path: '/unauthorized',
    element: (
      <SuspenseWrapper>
        <UnauthorizedPage />
      </SuspenseWrapper>
    ),
    errorElement: <RouteError />,
  },

  // 404 fallback
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
