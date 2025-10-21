// API client with Axios

import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { appConfig } from '@/config/app.config';
import { getMockHandler } from './mock-api';

// Type for mock response error
interface MockResponseError extends Error {
  mockResponse: AxiosResponse;
  config: InternalAxiosRequestConfig;
}

// Create axios instance
export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API interceptor (runs first)
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const mockHandler = getMockHandler();

    // Check if we should use mock API
    if (mockHandler.shouldMock(config)) {
      try {
        const mockResponse = await mockHandler.handleRequest(config);

        // Create a fulfilled promise that mimics Axios response
        const axiosResponse: AxiosResponse = {
          data: mockResponse.data,
          status: mockResponse.status,
          statusText: mockResponse.statusText,
          headers: mockResponse.headers || {},
          config,
        };

        // Throw a special error that will be caught by the adapter
        // This prevents the actual HTTP request from being made
        const mockError = new Error('MockResponse') as MockResponseError;
        mockError.mockResponse = axiosResponse;
        mockError.config = config;
        throw mockError;
      } catch (error) {
        // If it's our mock response error, re-throw it
        if (error && typeof error === 'object' && 'mockResponse' in error) {
          throw error;
        }
        // For other errors during mocking, let them propagate
        throw error;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth & tenant interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get auth token from localStorage (auth store will set this)
    const authData = localStorage.getItem('auth-storage');

    if (authData) {
      try {
        const { state } = JSON.parse(authData);
        const token = state?.token;

        // Attach token to request
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Attach tenant ID if user has an industry
        const user = state?.user;
        if (user?.industryId) {
          config.headers['X-Tenant-ID'] = user.industryId;
        }

        // Attach user role for mock API routing
        if (user?.role) {
          config.headers['X-User-Role'] = user.role;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return response data directly
    return response;
  },
  async (error: unknown) => {
    // Handle mock responses
    if (error && typeof error === 'object' && 'mockResponse' in error) {
      return Promise.resolve((error as MockResponseError).mockResponse);
    }

    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - attempt token refresh
    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
          const { state } = JSON.parse(authData);
          const refreshToken = state?.refreshToken;

          if (refreshToken) {
            // Call refresh token endpoint
            const response = await axios.post(`${appConfig.apiBaseUrl}/auth/refresh`, {
              refreshToken,
            });

            const { token: newToken, refreshToken: newRefreshToken } = response.data;

            // Update tokens in localStorage
            const updatedAuthData = {
              ...JSON.parse(authData),
              state: {
                ...state,
                token: newToken,
                refreshToken: newRefreshToken,
              },
            };
            localStorage.setItem('auth-storage', JSON.stringify(updatedAuthData));

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed - clear auth data and redirect to login
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden
    if (axiosError.response?.status === 403) {
      // Redirect to unauthorized page
      window.location.href = '/unauthorized';
    }

    // Handle network errors
    if (!axiosError.response) {
      console.error('Network error:', axiosError.message);
    }

    return Promise.reject(axiosError);
  }
);

// Helper function to handle API errors
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string') {
      return message;
    }
    if (error.response?.data?.errors) {
      // Handle validation errors
      const errors = error.response.data.errors;
      return Object.values(errors).flat().join(', ');
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
