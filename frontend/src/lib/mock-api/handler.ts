// Mock API request handler

import type { InternalAxiosRequestConfig } from 'axios';
import type { MockEndpoint, MockRequest, MockResponse, MockConfig } from './types';
import { mockEndpoints } from './endpoints';

class MockAPIHandler {
  private config: MockConfig;
  private endpoints: MockEndpoint[];

  constructor(config: MockConfig) {
    this.config = config;
    this.endpoints = mockEndpoints;
  }

  /**
   * Check if a request should be mocked
   */
  shouldMock(config: InternalAxiosRequestConfig): boolean {
    if (!this.config.enabled) {
      return false;
    }

    // Check if we have a handler for this request
    const handler = this.findHandler(config);
    return handler !== null;
  }

  /**
   * Find a matching handler for the request
   */
  private findHandler(config: InternalAxiosRequestConfig): MockEndpoint | null {
    const method = (config.method?.toUpperCase() || 'GET') as MockEndpoint['method'];
    const url = this.getCleanUrl(config.url || '');

    for (const endpoint of this.endpoints) {
      if (endpoint.method !== method) {
        continue;
      }

      // Match path (string or regex)
      if (typeof endpoint.path === 'string') {
        if (this.matchPath(url, endpoint.path)) {
          return endpoint;
        }
      } else if (endpoint.path instanceof RegExp) {
        if (endpoint.path.test(url)) {
          return endpoint;
        }
      }
    }

    return null;
  }

  /**
   * Match URL path with potential parameters
   */
  private matchPath(url: string, pattern: string): boolean {
    // Remove query parameters for matching
    const urlPath = url.split('?')[0];
    const patternPath = pattern.split('?')[0];

    // Exact match
    if (urlPath === patternPath) {
      return true;
    }

    // Match with parameters (e.g., /machines/:id)
    const urlParts = urlPath.split('/').filter(Boolean);
    const patternParts = patternPath.split('/').filter(Boolean);

    if (urlParts.length !== patternParts.length) {
      return false;
    }

    return patternParts.every((part, index) => {
      if (part.startsWith(':')) {
        // This is a parameter, match any value
        return true;
      }
      return part === urlParts[index];
    });
  }

  /**
   * Remove base URL from the path
   */
  private getCleanUrl(url: string): string {
    // Remove base URL if present
    const baseURL = import.meta.env.VITE_API_BASE_URL || '';
    if (baseURL && url.startsWith(baseURL)) {
      url = url.substring(baseURL.length);
    }

    // Ensure starts with /
    if (!url.startsWith('/')) {
      url = '/' + url;
    }

    return url;
  }

  /**
   * Extract URL parameters from path
   */
  private extractParams(url: string, pattern: string): Record<string, string> {
    const params: Record<string, string> = {};
    const urlParts = url.split('/').filter(Boolean);
    const patternParts = pattern.split('/').filter(Boolean);

    patternParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.substring(1);
        params[paramName] = urlParts[index];
      }
    });

    return params;
  }

  /**
   * Handle mock request
   */
  async handleRequest(config: InternalAxiosRequestConfig): Promise<MockResponse> {
    const endpoint = this.findHandler(config);

    if (!endpoint) {
      throw new Error(`No mock handler found for ${config.method} ${config.url}`);
    }

    const url = this.getCleanUrl(config.url || '');
    const pathPattern = typeof endpoint.path === 'string' ? endpoint.path : '';

    const mockRequest: MockRequest = {
      method: config.method?.toUpperCase() || 'GET',
      url,
      data: config.data,
      params: {
        ...config.params,
        ...this.extractParams(url, pathPattern),
      },
      headers: config.headers as Record<string, string>,
    };

    // Log if enabled
    if (this.config.logging) {
      console.log(
        `[Mock API] ${mockRequest.method} ${mockRequest.url}`,
        mockRequest.params ? { params: mockRequest.params } : ''
      );
    }

    // Apply delay
    const delay = endpoint.delay ?? this.config.delay ?? 300;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Execute handler
    const response = await endpoint.handler(mockRequest);

    // Log response if enabled
    if (this.config.logging) {
      console.log(`[Mock API] Response ${response.status}:`, response.data);
    }

    return response;
  }
}

// Singleton instance
let mockHandler: MockAPIHandler | null = null;

export function getMockHandler(): MockAPIHandler {
  if (!mockHandler) {
    const enabled = import.meta.env.VITE_ENABLE_MOCK_API === 'true';
    const logging = import.meta.env.VITE_MOCK_API_LOGGING === 'true';
    const delay = parseInt(import.meta.env.VITE_MOCK_API_DELAY || '300');

    mockHandler = new MockAPIHandler({
      enabled,
      logging,
      delay,
    });
  }

  return mockHandler;
}

export function resetMockHandler(): void {
  mockHandler = null;
}
