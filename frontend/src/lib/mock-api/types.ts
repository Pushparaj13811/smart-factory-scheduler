// Mock API types and interfaces

export interface MockRequest {
  method: string;
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface MockResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, string>;
}

export type MockHandler = (
  request: MockRequest
) => Promise<MockResponse> | MockResponse;

export interface MockEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string | RegExp;
  handler: MockHandler;
  delay?: number; // Optional delay in ms to simulate network latency
}

export interface MockConfig {
  enabled: boolean;
  delay?: number; // Default delay for all endpoints
  logging?: boolean; // Log mock API calls
}
