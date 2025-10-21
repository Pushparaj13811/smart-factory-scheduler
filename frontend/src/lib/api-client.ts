// API client with Axios

import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '@/config/app.config';

// Create axios instance
export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
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
    if (error.response?.status === 403) {
      // Redirect to unauthorized page
      window.location.href = '/unauthorized';
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
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
