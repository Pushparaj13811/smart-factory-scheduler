// Application Settings page

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export default function SettingsPage() {
  const { t } = useTranslation(['settings', 'common']);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSave = () => {
    console.log('Saving settings...');
    // TODO: Implement save functionality
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
      />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t('tabs.general')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('tabs.notifications')}</TabsTrigger>
          <TabsTrigger value="security">{t('tabs.security')}</TabsTrigger>
          <TabsTrigger value="preferences">{t('tabs.preferences')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('general.title')}</CardTitle>
              <CardDescription>{t('general.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">{t('general.companyName')}</Label>
                <Input
                  id="company-name"
                  placeholder={t('general.companyNamePlaceholder')}
                  defaultValue="My Factory"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry-type">{t('general.industryType')}</Label>
                <Select defaultValue="manufacturing">
                  <SelectTrigger id="industry-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">{t('general.industries.manufacturing')}</SelectItem>
                    <SelectItem value="automotive">{t('general.industries.automotive')}</SelectItem>
                    <SelectItem value="electronics">{t('general.industries.electronics')}</SelectItem>
                    <SelectItem value="textiles">{t('general.industries.textiles')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">{t('general.timezone')}</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={handleSave}>{t('common:actions.saveChanges')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications.title')}</CardTitle>
              <CardDescription>{t('notifications.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.email')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('notifications.emailDescription')}
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('notifications.push')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('notifications.pushDescription')}
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>{t('notifications.alerts')}</Label>
                <div className="space-y-3 ml-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="maintenance-alerts" defaultChecked />
                    <Label htmlFor="maintenance-alerts" className="font-normal">
                      {t('notifications.maintenanceAlerts')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="inventory-alerts" defaultChecked />
                    <Label htmlFor="inventory-alerts" className="font-normal">
                      {t('notifications.inventoryAlerts')}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="order-alerts" defaultChecked />
                    <Label htmlFor="order-alerts" className="font-normal">
                      {t('notifications.orderAlerts')}
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={handleSave}>{t('common:actions.saveChanges')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('security.title')}</CardTitle>
              <CardDescription>{t('security.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('security.twoFactor')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('security.twoFactorDescription')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('security.autoBackup')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('security.autoBackupDescription')}
                  </p>
                </div>
                <Switch
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>{t('security.sessionTimeout')}</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 {t('common:time.minutes')}</SelectItem>
                    <SelectItem value="30">30 {t('common:time.minutes')}</SelectItem>
                    <SelectItem value="60">1 {t('common:time.hour')}</SelectItem>
                    <SelectItem value="240">4 {t('common:time.hours')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline">{t('security.changePassword')}</Button>
                <Button onClick={handleSave}>{t('common:actions.saveChanges')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('preferences.title')}</CardTitle>
              <CardDescription>{t('preferences.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t('preferences.language')}</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>{t('preferences.theme')}</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t('preferences.themes.light')}</SelectItem>
                    <SelectItem value="dark">{t('preferences.themes.dark')}</SelectItem>
                    <SelectItem value="system">{t('preferences.themes.system')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>{t('preferences.dateFormat')}</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={handleSave}>{t('common:actions.saveChanges')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
