// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Mock API endpoints for system admin
// @ts-nocheck - Mock API file with loose types

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import {
  MOCK_INDUSTRIES,
  MOCK_SUBSCRIPTIONS,
  MOCK_PLATFORM_ANALYTICS,
} from '@/lib/mock-data';
import { IndustryStatus } from '@/features/system/types';
import type {
  IndustriesResponse,
  Industry,
  SubscriptionsResponse,
  Subscription,
} from '@/features/system/types';

export const systemEndpoints: MockEndpoint[] = [
  // GET /system/industries
  {
    method: 'GET',
    path: '/system/industries',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const search = (params.search as string) || '';

      let filteredIndustries = [...MOCK_INDUSTRIES];

      if (search) {
        filteredIndustries = filteredIndustries.filter(
          (industry) =>
            industry.name.toLowerCase().includes(search.toLowerCase()) ||
            industry.adminEmail.toLowerCase().includes(search.toLowerCase())
        );
      }

      const total = filteredIndustries.length;
      const start = (page - 1) * pageSize;
      const industries = filteredIndustries.slice(start, start + pageSize);

      const response: IndustriesResponse = {
        industries,
        total,
        page,
        pageSize,
      };

      return {
        data: response,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /system/industries/:id
  {
    method: 'GET',
    path: /^\/system\/industries\/[^/]+$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.url.split('/').pop();
      const industry = MOCK_INDUSTRIES.find((i) => i.id === id);

      if (!industry) {
        return {
          data: { message: 'Industry not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: industry,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /system/industries/:id/suspend
  {
    method: 'POST',
    path: /^\/system\/industries\/[^/]+\/suspend$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.url.split('/')[3];
      const industryIndex = MOCK_INDUSTRIES.findIndex((i) => i.id === id);

      if (industryIndex === -1) {
        return {
          data: { message: 'Industry not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      MOCK_INDUSTRIES[industryIndex].status = IndustryStatus.SUSPENDED;
      MOCK_INDUSTRIES[industryIndex].updatedAt = new Date().toISOString();

      return {
        data: MOCK_INDUSTRIES[industryIndex],
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /system/industries/:id/activate
  {
    method: 'POST',
    path: /^\/system\/industries\/[^/]+\/activate$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.url.split('/')[3];
      const industryIndex = MOCK_INDUSTRIES.findIndex((i) => i.id === id);

      if (industryIndex === -1) {
        return {
          data: { message: 'Industry not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      MOCK_INDUSTRIES[industryIndex].status = IndustryStatus.ACTIVE;
      MOCK_INDUSTRIES[industryIndex].updatedAt = new Date().toISOString();

      return {
        data: MOCK_INDUSTRIES[industryIndex],
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /system/subscriptions
  {
    method: 'GET',
    path: '/system/subscriptions',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const search = (params.search as string) || '';

      let filteredSubscriptions = [...MOCK_SUBSCRIPTIONS];

      if (search) {
        filteredSubscriptions = filteredSubscriptions.filter(
          (sub) =>
            sub.industryName.toLowerCase().includes(search.toLowerCase()) ||
            sub.id.toLowerCase().includes(search.toLowerCase())
        );
      }

      const total = filteredSubscriptions.length;
      const start = (page - 1) * pageSize;
      const subscriptions = filteredSubscriptions.slice(start, start + pageSize);

      const response: SubscriptionsResponse = {
        subscriptions,
        total,
        page,
        pageSize,
      };

      return {
        data: response,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /system/subscriptions/:id
  {
    method: 'GET',
    path: /^\/system\/subscriptions\/[^/]+$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.url.split('/').pop();
      const subscription = MOCK_SUBSCRIPTIONS.find((s) => s.id === id);

      if (!subscription) {
        return {
          data: { message: 'Subscription not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: subscription,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /system/analytics
  {
    method: 'GET',
    path: '/system/analytics',
    handler: async (): Promise<MockResponse> => {
      return {
        data: MOCK_PLATFORM_ANALYTICS,
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
