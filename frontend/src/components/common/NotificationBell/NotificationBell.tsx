// Notification bell component

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Mock notifications - will be replaced with real data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Schedule Updated',
    message: 'Production schedule has been optimized',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    title: 'Maintenance Alert',
    message: 'Machine #3 requires maintenance',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'Order Completed',
    message: 'Order #1234 has been completed',
    time: '2 hours ago',
    read: true,
  },
];

export function NotificationBell() {
  const { t } = useTranslation(['navigation', 'components']);
  const [notifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>{t('navigation:header.notifications')}</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {t('navigation:header.newNotifications', { count: unreadCount })}
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">
              {t('navigation:header.noNotifications')}
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer flex-col items-start gap-1 p-3"
              >
                <div className="flex w-full items-start justify-between">
                  <span
                    className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}
                  >
                    {notification.title}
                  </span>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{notification.message}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-center text-sm text-primary">
          {t('navigation:header.viewAllNotifications')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
