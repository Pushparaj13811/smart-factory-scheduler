// Preferences Tab Component

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell, Globe, Clock, Palette } from 'lucide-react';
import { toast } from 'sonner';

export function PreferencesTab() {
  const { t, i18n } = useTranslation(['profile', 'common']);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    orderUpdates: true,
    maintenanceAlerts: true,
    scheduleChanges: true,
    systemUpdates: false,
    weeklyReport: true,
  });

  const [preferences, setPreferences] = useState({
    language: i18n.language,
    timezone: 'Asia/Kolkata',
    dateFormat: 'dd/MM/yyyy',
    theme: 'system',
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
    toast.success(t('common:messages.preferencesUpdated'));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({ ...preferences, [key]: value });
    if (key === 'language') {
      i18n.changeLanguage(value);
    }
    toast.success(t('common:messages.preferencesUpdated'));
  };

  return (
    <div className="space-y-6">
      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t('preferences.languageAndRegion')}
          </CardTitle>
          <CardDescription>{t('preferences.languageDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">{t('preferences.language')}</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hi">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>हिन्दी (Hindi)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="gu">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      <span>ગુજરાતી (Gujarati)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">
                <Clock className="inline h-4 w-4 mr-1" />
                {t('preferences.timezone')}
              </Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => handlePreferenceChange('timezone', value)}
              >
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">British Time (GMT)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Japan Time (JST)</SelectItem>
                  <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">{t('preferences.dateFormat')}</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => handlePreferenceChange('dateFormat', value)}
              >
                <SelectTrigger id="dateFormat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/MM/yyyy">DD/MM/YYYY (31/12/2024)</SelectItem>
                  <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (12/31/2024)</SelectItem>
                  <SelectItem value="yyyy-MM-dd">YYYY-MM-DD (2024-12-31)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">
                <Palette className="inline h-4 w-4 mr-1" />
                {t('preferences.theme')}
              </Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => handlePreferenceChange('theme', value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('preferences.lightMode')}</SelectItem>
                  <SelectItem value="dark">{t('preferences.darkMode')}</SelectItem>
                  <SelectItem value="system">{t('preferences.systemDefault')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('preferences.notifications')}
          </CardTitle>
          <CardDescription>{t('preferences.notificationsDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email & Push */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">{t('preferences.channels')}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('preferences.emailNotifications')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('preferences.emailDescription')}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('preferences.pushNotifications')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('preferences.pushDescription')}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Activity Notifications */}
            <div>
              <h4 className="font-medium mb-3">{t('preferences.activityNotifications')}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{t('preferences.orderUpdates')}</Label>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{t('preferences.maintenanceAlerts')}</Label>
                  <Switch
                    checked={notifications.maintenanceAlerts}
                    onCheckedChange={(checked) =>
                      handleNotificationChange('maintenanceAlerts', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{t('preferences.scheduleChanges')}</Label>
                  <Switch
                    checked={notifications.scheduleChanges}
                    onCheckedChange={(checked) =>
                      handleNotificationChange('scheduleChanges', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>{t('preferences.systemUpdates')}</Label>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange('systemUpdates', checked)
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Digest */}
            <div>
              <h4 className="font-medium mb-3">{t('preferences.digest')}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('preferences.weeklyReport')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('preferences.weeklyReportDescription')}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => handleNotificationChange('weeklyReport', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
