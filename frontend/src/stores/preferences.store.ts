// User preferences state management with Zustand
// Manages application-wide user preferences and settings

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'hi' | 'gu';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';

interface UserPreferences {
  // Notification preferences
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;

  // Display preferences
  theme: Theme;
  language: Language;
  dateFormat: DateFormat;
  timezone: string;

  // Data preferences
  autoBackup: boolean;
  dataRetentionDays: number;

  // UI preferences
  compactMode: boolean;
  showAvatars: boolean;
  animationsEnabled: boolean;
}

interface PreferencesState extends UserPreferences {
  // Actions
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setDateFormat: (format: DateFormat) => void;
  setTimezone: (timezone: string) => void;
  toggleEmailNotifications: () => void;
  togglePushNotifications: () => void;
  toggleSMSNotifications: () => void;
  toggleAutoBackup: () => void;
  toggleCompactMode: () => void;
  toggleShowAvatars: () => void;
  toggleAnimations: () => void;
}

const defaultPreferences: UserPreferences = {
  // Notification preferences
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,

  // Display preferences
  theme: 'system',
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  // Data preferences
  autoBackup: true,
  dataRetentionDays: 90,

  // UI preferences
  compactMode: false,
  showAvatars: true,
  animationsEnabled: true,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      // Initial state
      ...defaultPreferences,

      // Actions
      updatePreference: (key, value) =>
        set({
          [key]: value,
        }),

      updatePreferences: (preferences) =>
        set((state) => ({
          ...state,
          ...preferences,
        })),

      resetPreferences: () =>
        set({
          ...defaultPreferences,
        }),

      setTheme: (theme) =>
        set({
          theme,
        }),

      setLanguage: (language) =>
        set({
          language,
        }),

      setDateFormat: (format) =>
        set({
          dateFormat: format,
        }),

      setTimezone: (timezone) =>
        set({
          timezone,
        }),

      toggleEmailNotifications: () =>
        set((state) => ({
          emailNotifications: !state.emailNotifications,
        })),

      togglePushNotifications: () =>
        set((state) => ({
          pushNotifications: !state.pushNotifications,
        })),

      toggleSMSNotifications: () =>
        set((state) => ({
          smsNotifications: !state.smsNotifications,
        })),

      toggleAutoBackup: () =>
        set((state) => ({
          autoBackup: !state.autoBackup,
        })),

      toggleCompactMode: () =>
        set((state) => ({
          compactMode: !state.compactMode,
        })),

      toggleShowAvatars: () =>
        set((state) => ({
          showAvatars: !state.showAvatars,
        })),

      toggleAnimations: () =>
        set((state) => ({
          animationsEnabled: !state.animationsEnabled,
        })),
    }),
    {
      name: 'preferences-storage',
    }
  )
);
