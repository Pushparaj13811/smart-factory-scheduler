// User Details component

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar, Building2, Shield, User as UserIcon } from 'lucide-react';
import type { User } from '@/types/auth.types';
import { ROLE_LABELS, ROLE_DESCRIPTIONS, type UserRole } from '@/constants/roles';

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
  const { t } = useTranslation(['users', 'common']);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('details.profile')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div>
                <Badge variant="outline" className="text-sm">
                  <Shield className="mr-1 h-3 w-3" />
                  {ROLE_LABELS[user.role as UserRole]}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span>{t('details.userId')}</span>
              </div>
              <p className="font-mono text-sm">{user.id}</p>
            </div>

            {user.industryId && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{t('form.industry')}</span>
                </div>
                <p className="font-medium">{user.industryId}</p>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{t('details.joinedOn')}</span>
              </div>
              <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{t('details.lastUpdated')}</span>
              </div>
              <p className="font-medium">{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('details.roleInformation')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('form.role')}</span>
              <Badge variant="outline">{ROLE_LABELS[user.role as UserRole]}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{ROLE_DESCRIPTIONS[user.role as UserRole]}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('details.permissions')}</h4>
            <div className="grid gap-2">
              {getPermissionsForRole(user.role).map((permission, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{t(`permissions.${permission}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to get permissions based on role
function getPermissionsForRole(role: string): string[] {
  const permissionsMap: Record<string, string[]> = {
    SYSTEM_ADMIN: [
      'manageAllIndustries',
      'manageSubscriptions',
      'viewAnalytics',
      'systemConfiguration',
    ],
    INDUSTRY_OWNER: [
      'manageIndustry',
      'manageUsers',
      'manageMachines',
      'viewReports',
      'manageOrders',
    ],
    ADMINISTRATOR: ['manageUsers', 'manageMachines', 'manageOrders', 'viewReports'],
    SUPERVISOR: ['viewMachines', 'manageSchedule', 'assignTasks', 'viewReports'],
    WORKER: ['viewTasks', 'updateTaskStatus', 'viewSchedule'],
  };

  return permissionsMap[role] || [];
}
