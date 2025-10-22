// Application configuration

export const appConfig = {
  // App information
  name: import.meta.env.VITE_APP_NAME || 'Smart Factory Scheduler',
  version: '1.0.0',

  // API configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',

  // Feature flags
  enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',

  // Pagination
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],

  // Date/Time format
  dateFormat: 'MMM DD, YYYY',
  timeFormat: 'HH:mm',
  dateTimeFormat: 'MMM DD, YYYY HH:mm',

  // File upload
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],

  // Session
  tokenRefreshInterval: 5 * 60 * 1000, // 5 minutes
  sessionTimeout: 30 * 60 * 1000, // 30 minutes

  // UI
  toastDuration: 3000, // 3 seconds
  debounceDelay: 300, // 300ms for search inputs

  // Supported languages
  languages: [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  ],
  defaultLanguage: 'en',
} as const;

export type AppConfig = typeof appConfig;
