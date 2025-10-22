// Mock API endpoints for dashboard

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import {
  MOCK_DASHBOARD_METRICS,
  MOCK_SYSTEM_ADMIN_ACTIVITIES,
  MOCK_INDUSTRY_OWNER_ACTIVITIES,
  MOCK_ADMINISTRATOR_ACTIVITIES,
  MOCK_SUPERVISOR_ACTIVITIES,
  MOCK_WORKER_ACTIVITIES,
  MOCK_SCHEDULE_TASKS,
  MOCK_MACHINE_STATUS,
} from '@/lib/mock-data';
import { UserRole } from '@/constants/roles';

export const dashboardEndpoints: MockEndpoint[] = [
  // GET /dashboard/metrics
  {
    method: 'GET',
    path: '/dashboard/metrics',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      // Get user role from headers or default to INDUSTRY_OWNER
      const role = (request.headers?.['X-User-Role'] as UserRole) || UserRole.INDUSTRY_OWNER;
      const metrics = MOCK_DASHBOARD_METRICS[role] || MOCK_DASHBOARD_METRICS[UserRole.INDUSTRY_OWNER];

      return {
        data: metrics,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /dashboard/system-admin/metrics
  {
    method: 'GET',
    path: '/dashboard/system-admin/metrics',
    handler: async (): Promise<MockResponse> => {
      return {
        data: MOCK_DASHBOARD_METRICS[UserRole.SYSTEM_ADMIN],
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /dashboard/activity
  {
    method: 'GET',
    path: '/dashboard/activity',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      // Get user role from headers
      const role = (request.headers?.['X-User-Role'] as UserRole) || UserRole.INDUSTRY_OWNER;

      // Return role-specific activities
      let activities;
      switch (role) {
        case UserRole.SYSTEM_ADMIN:
          activities = MOCK_SYSTEM_ADMIN_ACTIVITIES;
          break;
        case UserRole.INDUSTRY_OWNER:
          activities = MOCK_INDUSTRY_OWNER_ACTIVITIES;
          break;
        case UserRole.ADMINISTRATOR:
          activities = MOCK_ADMINISTRATOR_ACTIVITIES;
          break;
        case UserRole.SUPERVISOR:
          activities = MOCK_SUPERVISOR_ACTIVITIES;
          break;
        case UserRole.WORKER:
          activities = MOCK_WORKER_ACTIVITIES;
          break;
        default:
          activities = MOCK_INDUSTRY_OWNER_ACTIVITIES;
      }

      return {
        data: activities,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /dashboard/schedule
  {
    method: 'GET',
    path: '/dashboard/schedule',
    handler: async (): Promise<MockResponse> => {
      return {
        data: MOCK_SCHEDULE_TASKS,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /dashboard/machine-status
  {
    method: 'GET',
    path: '/dashboard/machine-status',
    handler: async (): Promise<MockResponse> => {
      return {
        data: MOCK_MACHINE_STATUS,
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
