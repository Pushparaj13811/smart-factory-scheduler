// Activity Tab Component

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  History,
  LogIn,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Settings,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'login' | 'logout' | 'update' | 'create' | 'delete' | 'security';
  title: string;
  description: string;
  timestamp: Date;
  ip?: string;
  device?: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'login',
    title: 'Signed in',
    description: 'Logged in from Chrome on Windows',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    ip: '192.168.1.100',
    device: 'Chrome on Windows 11',
  },
  {
    id: '2',
    type: 'update',
    title: 'Profile updated',
    description: 'Updated personal information',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '3',
    type: 'security',
    title: 'Password changed',
    description: 'Successfully changed account password',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '4',
    type: 'create',
    title: 'Order created',
    description: 'Created new order #ORD-2024-012',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: '5',
    type: 'login',
    title: 'Signed in',
    description: 'Logged in from Safari on macOS',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    ip: '192.168.1.101',
    device: 'Safari on macOS 14',
  },
  {
    id: '6',
    type: 'update',
    title: 'Settings changed',
    description: 'Updated notification preferences',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: '7',
    type: 'delete',
    title: 'Component deleted',
    description: 'Removed component #CMP-045',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: '8',
    type: 'logout',
    title: 'Signed out',
    description: 'Logged out from all devices',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
];

export function ActivityTab() {
  const { t } = useTranslation(['profile', 'common']);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4" />;
      case 'logout':
        return <LogOut className="h-4 w-4" />;
      case 'update':
        return <Edit className="h-4 w-4" />;
      case 'create':
        return <Plus className="h-4 w-4" />;
      case 'delete':
        return <Trash2 className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'login':
        return 'bg-green-500/10 text-green-500';
      case 'logout':
        return 'bg-gray-500/10 text-gray-500';
      case 'update':
        return 'bg-blue-500/10 text-blue-500';
      case 'create':
        return 'bg-purple-500/10 text-purple-500';
      case 'delete':
        return 'bg-red-500/10 text-red-500';
      case 'security':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} ${t('common:time.minutes')} ${t('common:time.ago')}`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ${t('common:time.hours')} ${t('common:time.ago')}`;
    } else if (diffInHours < 48) {
      return t('common:time.yesterday');
    } else {
      return format(date, 'MMM dd, yyyy HH:mm');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t('activity.recentActivity')}
          </CardTitle>
          <CardDescription>{t('activity.activityDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {mockActivity.map((activity, index) => (
                <div key={activity.id} className="relative">
                  {index !== mockActivity.length - 1 && (
                    <div className="absolute left-5 top-11 bottom-0 w-px bg-border" />
                  )}
                  <div className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getActivityColor(
                        activity.type
                      )}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1 pt-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                      {(activity.ip || activity.device) && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {activity.device && (
                            <Badge variant="outline" className="text-xs">
                              {activity.device}
                            </Badge>
                          )}
                          {activity.ip && (
                            <Badge variant="outline" className="text-xs">
                              {activity.ip}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{t('activity.accountStatistics')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('activity.totalLogins')}</p>
              <p className="text-2xl font-bold">247</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('activity.accountAge')}</p>
              <p className="text-2xl font-bold">184 {t('common:time.days')}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('activity.lastActivity')}</p>
              <p className="text-2xl font-bold">15 {t('common:time.minutes')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
