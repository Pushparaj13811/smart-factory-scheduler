// Home page - Role-based Dashboard

import { useAuth } from '@/hooks/useAuth';
import {
  SystemAdminDashboard,
  IndustryOwnerDashboard,
  AdministratorDashboard,
  SupervisorDashboard,
  WorkerDashboard,
} from '@/features/dashboard/pages';

export default function HomePage() {
  const { user } = useAuth();

  // Route to the appropriate dashboard based on user role
  switch (user?.role) {
    case 'SYSTEM_ADMIN':
      return <SystemAdminDashboard />;
    case 'INDUSTRY_OWNER':
      return <IndustryOwnerDashboard />;
    case 'ADMINISTRATOR':
      return <AdministratorDashboard />;
    case 'SUPERVISOR':
      return <SupervisorDashboard />;
    case 'WORKER':
      return <WorkerDashboard />;
    default:
      return <IndustryOwnerDashboard />;
  }
}
