// API endpoint constants

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },

  // Machines
  MACHINES: {
    BASE: '/machines',
    BY_ID: (id: string) => `/machines/${id}`,
    TOGGLE_MAINTENANCE: (id: string) => `/machines/${id}/maintenance`,
    MAINTENANCE_HISTORY: (id: string) => `/machines/${id}/maintenance/history`,
    UTILIZATION: (id: string) => `/machines/${id}/utilization`,
  },

  // Components
  COMPONENTS: {
    BASE: '/components',
    BY_ID: (id: string) => `/components/${id}`,
    PRODUCTION_HISTORY: (id: string) => `/components/${id}/production/history`,
  },

  // Raw Materials
  RAW_MATERIALS: {
    BASE: '/raw-materials',
    BY_ID: (id: string) => `/raw-materials/${id}`,
    UPDATE_STOCK: (id: string) => `/raw-materials/${id}/stock`,
    USAGE_HISTORY: (id: string) => `/raw-materials/${id}/usage/history`,
    LOW_STOCK: '/raw-materials/low-stock',
  },

  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    UPDATE_PRIORITY: (id: string) => `/orders/${id}/priority`,
    DUPLICATE: (id: string) => `/orders/${id}/duplicate`,
    IMPACT_ANALYSIS: (id: string) => `/orders/${id}/impact-analysis`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },

  // Scheduling
  SCHEDULE: {
    CURRENT: '/schedule/current',
    BY_MACHINE: (machineId: string) => `/schedule/machine/${machineId}`,
    BY_WORKER: (workerId: string) => `/schedule/worker/${workerId}`,
    OPTIMIZE: '/schedule/optimize',
    OPTIMIZATION_HISTORY: '/schedule/optimization/history',
    UPDATE_TASK: (taskId: string) => `/schedule/tasks/${taskId}`,
  },

  // Maintenance
  MAINTENANCE: {
    BASE: '/maintenance',
    BY_ID: (id: string) => `/maintenance/${id}`,
    SCHEDULED: '/maintenance/scheduled',
    HISTORY: '/maintenance/history',
    IMPACT: '/maintenance/impact',
  },

  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE_ROLE: (id: string) => `/users/${id}/role`,
    ACTIVITY_LOG: (id: string) => `/users/${id}/activity`,
  },

  // Reports
  REPORTS: {
    GENERATE: '/reports/generate',
    EXPORT: (reportId: string) => `/reports/${reportId}/export`,
    SCHEDULED: '/reports/scheduled',
    SCHEDULE: '/reports/schedule',
  },

  // System Admin
  SYSTEM: {
    INDUSTRIES: {
      BASE: '/system/industries',
      BY_ID: (id: string) => `/system/industries/${id}`,
      SUSPEND: (id: string) => `/system/industries/${id}/suspend`,
      ACTIVATE: (id: string) => `/system/industries/${id}/activate`,
    },
    SUBSCRIPTIONS: {
      BASE: '/system/subscriptions',
      BY_ID: (id: string) => `/system/subscriptions/${id}`,
    },
    ANALYTICS: {
      PLATFORM_METRICS: '/system/analytics/platform-metrics',
    },
  },

  // Dashboard
  DASHBOARD: {
    METRICS: '/dashboard/metrics',
    ACTIVITIES: '/dashboard/activities',
  },

  // Settings
  SETTINGS: {
    INDUSTRY: '/settings/industry',
    NOTIFICATIONS: '/settings/notifications',
    INTEGRATIONS: '/settings/integrations',
    SECURITY: '/settings/security',
  },
} as const;
