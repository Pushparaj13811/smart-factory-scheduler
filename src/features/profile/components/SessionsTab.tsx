// Sessions Tab Component

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Monitor, Smartphone, Tablet, MapPin, Clock, LogOut, Shield, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Session {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: Date;
  isCurrent: boolean;
}

const mockSessions: Session[] = [
  {
    id: '1',
    device: 'Windows Desktop',
    deviceType: 'desktop',
    browser: 'Chrome 120.0',
    os: 'Windows 11',
    location: 'Mumbai, India',
    ip: '192.168.1.100',
    lastActive: new Date(),
    isCurrent: true,
  },
  {
    id: '2',
    device: 'iPhone 15 Pro',
    deviceType: 'mobile',
    browser: 'Safari 17.2',
    os: 'iOS 17.2',
    location: 'Mumbai, India',
    ip: '192.168.1.105',
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    isCurrent: false,
  },
  {
    id: '3',
    device: 'MacBook Pro',
    deviceType: 'desktop',
    browser: 'Safari 17.1',
    os: 'macOS 14.2',
    location: 'Delhi, India',
    ip: '103.45.122.89',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    isCurrent: false,
  },
];

export function SessionsTab() {
  const { t } = useTranslation(['profile', 'common']);
  const [sessions, setSessions] = useState(mockSessions);
  const [sessionToRevoke, setSessionToRevoke] = useState<string | null>(null);

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
    toast.success(t('sessions.sessionRevoked'));
    setSessionToRevoke(null);
  };

  const handleRevokeAllOthers = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
    toast.success(t('sessions.allOtherSessionsRevoked'));
  };

  const getDeviceIcon = (type: Session['deviceType']) => {
    switch (type) {
      case 'desktop':
        return <Monitor className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);

    if (diffInMinutes < 1) return t('sessions.activeNow');
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)} ${t('common:time.minutes')} ${t('common:time.ago')}`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ${t('common:time.hours')} ${t('common:time.ago')}`;
    return format(date, 'MMM dd, yyyy HH:mm');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('sessions.activeSessions')}
              </CardTitle>
              <CardDescription>{t('sessions.sessionsDescription')}</CardDescription>
            </div>
            {sessions.filter((s) => !s.isCurrent).length > 0 && (
              <Button variant="destructive" size="sm" onClick={handleRevokeAllOthers}>
                <LogOut className="mr-2 h-4 w-4" />
                {t('sessions.revokeAllOthers')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session, index) => (
            <div key={session.id}>
              {index > 0 && <Separator className="my-4" />}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {getDeviceIcon(session.deviceType)}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{session.device}</p>
                        {session.isCurrent && (
                          <Badge variant="default" className="text-xs gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {t('sessions.currentSession')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.browser} • {session.os}
                      </p>
                    </div>

                    {!session.isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSessionToRevoke(session.id)}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t('sessions.revoke')}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono">{session.ip}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{formatLastActive(session.lastActive)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {t('sessions.noActiveSessions')}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card>
        <CardHeader>
          <CardTitle>{t('sessions.securityTips')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p>{t('sessions.tip1')}</p>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p>{t('sessions.tip2')}</p>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p>{t('sessions.tip3')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revoke Session Dialog */}
      <AlertDialog open={sessionToRevoke !== null} onOpenChange={() => setSessionToRevoke(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('sessions.revokeSessionTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('sessions.revokeSessionDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common:actions.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => sessionToRevoke && handleRevokeSession(sessionToRevoke)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('sessions.revoke')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
