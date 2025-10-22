// Comprehensive User Profile Page

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Shield, Settings, History, Monitor } from 'lucide-react';
import {
  ProfileHeader,
  PersonalInfoTab,
  SecurityTab,
  PreferencesTab,
  ActivityTab,
  SessionsTab,
} from '../components';

export default function ProfilePage() {
  const { t } = useTranslation(['profile', 'common']);
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader />

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personal" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.personal')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.security')}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.preferences')}</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.activity')}</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">{t('tabs.sessions')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInfoTab />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <PreferencesTab />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityTab />
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <SessionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
