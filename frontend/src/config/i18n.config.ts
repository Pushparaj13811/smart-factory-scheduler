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

// Hindi translations
import hiCommon from '@/locales/hi/common.json';
import hiAuth from '@/locales/hi/auth.json';
import hiNavigation from '@/locales/hi/navigation.json';
import hiDashboard from '@/locales/hi/dashboard.json';
import hiComponents from '@/locales/hi/components.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: appConfig.defaultLanguage,
    supportedLngs: ['en', 'hi'],

    // Namespace configuration
    ns: ['common', 'auth', 'navigation', 'dashboard', 'components'],
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
      },
      hi: {
        common: hiCommon,
        auth: hiAuth,
        navigation: hiNavigation,
        dashboard: hiDashboard,
        components: hiComponents,
      },
    },
  });

export default i18n;
