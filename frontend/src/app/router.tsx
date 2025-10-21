// Router configuration

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/guards/ProtectedRoute';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AppLayout } from '@/components/layouts/AppLayout';

// Auth pages
import LoginPage from '@/features/auth/pages/LoginPage';
import SignupPage from '@/features/auth/pages/SignupPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';

// Other pages
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import HomePage from '@/pages/HomePage';

export const router = createBrowserRouter([
  // Auth routes (with AuthLayout)
  {
    element: <AuthLayout />,
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
  },

  // Protected routes (with AppLayout)
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // Future routes will be added here as we implement more features
      // Example:
      // { path: '/machines', element: <MachinesPage /> },
      // { path: '/orders', element: <OrdersPage /> },
    ],
  },

  // Catch-all redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
