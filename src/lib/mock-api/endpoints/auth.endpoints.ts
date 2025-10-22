// Mock API endpoints for authentication

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import {
  MOCK_USERS,
  validateCredentials,
  generateMockToken,
  generateMockRefreshToken,
  findUserById,
} from '@/lib/mock-data';

export const authEndpoints: MockEndpoint[] = [
  // POST /auth/login
  {
    method: 'POST',
    path: '/auth/login',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const { email, password } = request.data as { email: string; password: string };

      // Validate credentials
      const user = validateCredentials(email, password);

      if (!user) {
        return {
          data: { message: 'Invalid email or password' },
          status: 401,
          statusText: 'Unauthorized',
        };
      }

      // Generate tokens
      const token = generateMockToken(user.id);
      const refreshToken = generateMockRefreshToken(user.id);

      return {
        data: {
          user,
          token,
          refreshToken,
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /auth/signup
  {
    method: 'POST',
    path: '/auth/signup',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as {
        email: string;
        password: string;
        name: string;
        role: string;
      };

      // Check if user already exists
      const existingUser = MOCK_USERS.find((u) => u.email === data.email);
      if (existingUser) {
        return {
          data: { message: 'User already exists' },
          status: 409,
          statusText: 'Conflict',
        };
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      MOCK_USERS.push(newUser);

      const token = generateMockToken(newUser.id);
      const refreshToken = generateMockRefreshToken(newUser.id);

      return {
        data: {
          user: newUser,
          token,
          refreshToken,
        },
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // POST /auth/refresh
  {
    method: 'POST',
    path: '/auth/refresh',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const { refreshToken: oldRefreshToken } = request.data as {
        refreshToken: string;
      };

      // Extract user ID from refresh token (mock implementation)
      const userId = oldRefreshToken.split('-')[2];

      if (!userId) {
        return {
          data: { message: 'Invalid refresh token' },
          status: 401,
          statusText: 'Unauthorized',
        };
      }

      const user = findUserById(userId);
      if (!user) {
        return {
          data: { message: 'User not found' },
          status: 401,
          statusText: 'Unauthorized',
        };
      }

      // Generate new tokens
      const token = generateMockToken(user.id);
      const refreshToken = generateMockRefreshToken(user.id);

      return {
        data: {
          token,
          refreshToken,
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /auth/logout
  {
    method: 'POST',
    path: '/auth/logout',
    handler: async (): Promise<MockResponse> => {
      return {
        data: { message: 'Logged out successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /auth/forgot-password
  {
    method: 'POST',
    path: '/auth/forgot-password',
    handler: async (): Promise<MockResponse> => {
      return {
        data: { message: 'Password reset email sent' },
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
