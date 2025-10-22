// i18n configuration

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { appConfig } from './app.config';

// English translations
import enCommon from '@/locales/en/common.json';
import enAuth from '@/locales/en/auth.json';
import enNavigation from '@/locales/en/navigation.json';
import enDashboard from '@/locales/en/dashboard.json';
import enComponents from '@/locales/en/components.json';
import enComponentsFeature from '@/locales/en/componentsFeature.json';
import enMachines from '@/locales/en/machines.json';
import enRawMaterials from '@/locales/en/rawMaterials.json';
import enOrders from '@/locales/en/orders.json';
import enSchedule from '@/locales/en/schedule.json';
import enMaintenance from '@/locales/en/maintenance.json';
import enUsers from '@/locales/en/users.json';
import enReports from '@/locales/en/reports.json';
import enSettings from '@/locales/en/settings.json';
import enSystem from '@/locales/en/system.json';
import enProfile from '@/locales/en/profile.json';
import enLanding from '@/locales/en/landing.json';

// Hindi translations
import hiCommon from '@/locales/hi/common.json';
import hiAuth from '@/locales/hi/auth.json';
import hiNavigation from '@/locales/hi/navigation.json';
import hiDashboard from '@/locales/hi/dashboard.json';
import hiComponents from '@/locales/hi/components.json';
import hiComponentsFeature from '@/locales/hi/componentsFeature.json';
import hiMachines from '@/locales/hi/machines.json';
import hiRawMaterials from '@/locales/hi/rawMaterials.json';
import hiOrders from '@/locales/hi/orders.json';
import hiSchedule from '@/locales/hi/schedule.json';
import hiMaintenance from '@/locales/hi/maintenance.json';
import hiUsers from '@/locales/hi/users.json';
import hiReports from '@/locales/hi/reports.json';
import hiSettings from '@/locales/hi/settings.json';
import hiSystem from '@/locales/hi/system.json';
import hiProfile from '@/locales/hi/profile.json';
import hiLanding from '@/locales/hi/landing.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: appConfig.defaultLanguage,
    supportedLngs: ['en', 'hi'],

    // Namespace configuration
    ns: ['common', 'auth', 'navigation', 'dashboard', 'components', 'componentsFeature', 'machines', 'rawMaterials', 'orders', 'schedule', 'maintenance', 'users', 'reports', 'settings', 'system', 'profile', 'landing'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false, // React already escapes
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        navigation: enNavigation,
        dashboard: enDashboard,
        components: enComponents,
        componentsFeature: enComponentsFeature,
        machines: enMachines,
        rawMaterials: enRawMaterials,
        orders: enOrders,
        schedule: enSchedule,
        maintenance: enMaintenance,
        users: enUsers,
        reports: enReports,
        settings: enSettings,
        system: enSystem,
        profile: enProfile,
        landing: enLanding,
      },
      hi: {
        common: hiCommon,
        auth: hiAuth,
        navigation: hiNavigation,
        dashboard: hiDashboard,
        components: hiComponents,
        componentsFeature: hiComponentsFeature,
        machines: hiMachines,
        rawMaterials: hiRawMaterials,
        orders: hiOrders,
        schedule: hiSchedule,
        maintenance: hiMaintenance,
        users: hiUsers,
        reports: hiReports,
        settings: hiSettings,
        system: hiSystem,
        profile: hiProfile,
        landing: hiLanding,
      },
    },
  });

export default i18n;
