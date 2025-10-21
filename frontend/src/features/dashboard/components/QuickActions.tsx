// Quick Actions component for dashboard

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  Plus,
  Wrench,
  Calendar,
  FileText,
  Users,
  Building2,
  BarChart3,
  Zap,
  Package,
  ClipboardList,
  AlertCircle,
} from 'lucide-react';
import type { UserRole } from '@/constants/roles';

interface QuickAction {
  id: string;
  label: string;
  icon: typeof Plus;
  onClick: () => void;
  roles: UserRole[];
}

export function QuickActions() {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  const allActions: QuickAction[] = [
    {
      id: 'create-order',
      label: t('quickActions.createOrder'),
      icon: Plus,
      onClick: () => console.log('Create order'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR', 'SUPERVISOR'],
    },
    {
      id: 'add-machine',
      label: t('quickActions.addMachine'),
      icon: Wrench,
      onClick: () => console.log('Add machine'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR'],
    },
    {
      id: 'schedule-maintenance',
      label: t('quickActions.scheduleMaintenance'),
      icon: Calendar,
      onClick: () => console.log('Schedule maintenance'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR', 'SUPERVISOR'],
    },
    {
      id: 'view-reports',
      label: t('quickActions.viewReports'),
      icon: FileText,
      onClick: () => console.log('View reports'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR', 'SUPERVISOR'],
    },
    {
      id: 'manage-users',
      label: t('quickActions.manageUsers'),
      icon: Users,
      onClick: () => console.log('Manage users'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR'],
    },
    {
      id: 'add-industry',
      label: t('quickActions.addIndustry'),
      icon: Building2,
      onClick: () => console.log('Add industry'),
      roles: ['SYSTEM_ADMIN'],
    },
    {
      id: 'view-analytics',
      label: t('quickActions.viewAnalytics'),
      icon: BarChart3,
      onClick: () => console.log('View analytics'),
      roles: ['SYSTEM_ADMIN', 'INDUSTRY_OWNER'],
    },
    {
      id: 'optimize-schedule',
      label: t('quickActions.optimizeSchedule'),
      icon: Zap,
      onClick: () => console.log('Optimize schedule'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR', 'SUPERVISOR'],
    },
    {
      id: 'check-inventory',
      label: t('quickActions.checkInventory'),
      icon: Package,
      onClick: () => console.log('Check inventory'),
      roles: ['INDUSTRY_OWNER', 'ADMINISTRATOR', 'SUPERVISOR'],
    },
    {
      id: 'start-task',
      label: t('quickActions.startTask'),
      icon: ClipboardList,
      onClick: () => console.log('Start task'),
      roles: ['WORKER'],
    },
    {
      id: 'report-issue',
      label: t('quickActions.reportIssue'),
      icon: AlertCircle,
      onClick: () => console.log('Report issue'),
      roles: ['WORKER', 'SUPERVISOR'],
    },
  ];

  // Filter actions based on user role
  const availableActions = allActions.filter((action) =>
    action.roles.includes(user?.role as UserRole)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('quickActions.title')}</CardTitle>
        <CardDescription>{t('quickActions.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {availableActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto justify-start gap-3 py-3"
                onClick={action.onClick}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-left text-sm">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
