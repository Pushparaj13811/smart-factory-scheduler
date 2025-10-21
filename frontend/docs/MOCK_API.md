# Mock API System

## Overview

The Smart Factory Scheduler frontend includes a comprehensive mock API system that allows you to develop and test the application without a backend server. The mock API intercepts all API requests and returns realistic mock data, following the exact same interface as the real API.

## Features

- **Zero Backend Required**: Develop frontend features without waiting for backend implementation
- **Realistic Data**: Mock responses include realistic factory data with full relationships
- **Network Simulation**: Configurable delays to simulate real network latency
- **Request Logging**: Optional logging to debug API interactions
- **Seamless Switching**: Toggle between mock and real API with a single environment variable
- **Type-Safe**: Full TypeScript support with matching interfaces
- **Automatic Interceptor**: Uses Axios interceptors for transparent request handling

## Configuration

### Environment Variables

Configure the mock API using these environment variables in `.env.development`:

```env
# Enable or disable mock API
VITE_ENABLE_MOCK_API=true  # Set to 'false' to use real backend

# Simulated network delay (milliseconds)
VITE_MOCK_API_DELAY=300

# Enable request/response logging in console
VITE_MOCK_API_LOGGING=true
```

### Quick Start

1. **Enable Mock API** (default in development):
   ```env
   VITE_ENABLE_MOCK_API=true
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Use the application normally** - all API calls will be mocked automatically

4. **Switch to Real API** when backend is available:
   ```env
   VITE_ENABLE_MOCK_API=false
   ```

## Architecture

### How It Works

```
Component → Hook → Service → API Client → Mock Interceptor → Mock Handler → Mock Data
                                       ↓ (if mock disabled)
                                      Real Backend API
```

1. **Component** makes a request via React Query hooks
2. **Service** calls API client methods
3. **API Client** (Axios) triggers request interceptor
4. **Mock Interceptor** checks if request should be mocked
5. **Mock Handler** finds matching endpoint and executes handler
6. **Mock Data** is returned with realistic delay
7. **Response** flows back through the chain

### Key Components

#### 1. API Client (`lib/api-client.ts`)
- Axios instance with interceptors
- Checks `VITE_ENABLE_MOCK_API` flag
- Routes to mock handler when enabled

#### 2. Mock Handler (`lib/mock-api/handler.ts`)
- Matches incoming requests to endpoints
- Extracts URL parameters
- Simulates network delay
- Logs requests/responses

#### 3. Mock Endpoints (`lib/mock-api/endpoints/`)
- Organized by feature (auth, dashboard, machines)
- Follows real API structure
- Returns typed responses

#### 4. Mock Data (`lib/mock-data.ts`)
- Centralized mock data store
- Realistic factory data
- Shared across endpoints

## Adding New Mock Endpoints

### 1. Define the Endpoint

Create a new file in `lib/mock-api/endpoints/` or add to existing:

```typescript
// lib/mock-api/endpoints/orders.endpoints.ts
import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import { MOCK_ORDERS } from '@/lib/mock-data';

export const ordersEndpoints: MockEndpoint[] = [
  // GET /orders
  {
    method: 'GET',
    path: '/orders',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const { page = 1, pageSize = 10 } = request.params || {};

      // Filter and paginate
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const orders = MOCK_ORDERS.slice(start, end);

      return {
        data: {
          orders,
          total: MOCK_ORDERS.length,
          page,
          pageSize,
        },
        status: 200,
        statusText: 'OK',
      };
    },
    delay: 400, // Optional custom delay
  },

  // GET /orders/:id
  {
    method: 'GET',
    path: '/orders/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const order = MOCK_ORDERS.find(o => o.id === id);

      if (!order) {
        return {
          data: { message: 'Order not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: order,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /orders
  {
    method: 'POST',
    path: '/orders',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as CreateOrderInput;

      const newOrder = {
        id: `order-${Date.now()}`,
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      MOCK_ORDERS.push(newOrder);

      return {
        data: newOrder,
        status: 201,
        statusText: 'Created',
      };
    },
  },
];
```

### 2. Register the Endpoint

Add to `lib/mock-api/endpoints/index.ts`:

```typescript
import { ordersEndpoints } from './orders.endpoints';

export const mockEndpoints: MockEndpoint[] = [
  ...authEndpoints,
  ...dashboardEndpoints,
  ...machinesEndpoints,
  ...ordersEndpoints, // Add here
];
```

### 3. Add Mock Data

Add to `lib/mock-data.ts`:

```typescript
export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    componentId: 'comp-1',
    quantity: 100,
    priority: 'high',
    status: 'in_progress',
    deadline: '2024-12-01',
    createdAt: '2024-10-20T10:00:00Z',
  },
  // ... more orders
];
```

### 4. Update Service (remove inline mocks)

Simplify your service to always call the API:

```typescript
// services/order.service.ts
export const orderService = {
  async getOrders(page: number, pageSize: number) {
    const response = await apiClient.get('/orders', {
      params: { page, pageSize },
    });
    return response.data;
  },

  async getOrder(id: string) {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(data: CreateOrderInput) {
    const response = await apiClient.post('/orders', data);
    return response.data;
  },
};
```

## Path Patterns

The mock handler supports various path patterns:

### Exact Match
```typescript
path: '/auth/login'  // Matches only /auth/login
```

### Parameters
```typescript
path: '/machines/:id'  // Matches /machines/123, /machines/abc, etc.
// Access via: request.params.id
```

### Regex
```typescript
path: /^\/machines\/[^/]+\/maintenance$/
// Matches /machines/{id}/maintenance
```

## Best Practices

### 1. Match Real API Exactly
```typescript
// ✓ Good: Same response structure as real API
return {
  data: {
    machines: [...],
    total: 100,
    page: 1,
    pageSize: 10,
  },
  status: 200,
  statusText: 'OK',
};

// ✗ Bad: Different structure
return {
  data: [...],  // Missing pagination info
  status: 200,
  statusText: 'OK',
};
```

### 2. Handle Errors
```typescript
// Return appropriate error responses
if (!found) {
  return {
    data: { message: 'Resource not found' },
    status: 404,
    statusText: 'Not Found',
  };
}
```

### 3. Simulate Delays
```typescript
{
  method: 'POST',
  path: '/orders',
  delay: 800,  // Longer delay for create operations
  handler: async (request) => { /* ... */ },
}
```

### 4. Use Shared Mock Data
```typescript
// ✓ Good: Import from centralized mock-data.ts
import { MOCK_MACHINES } from '@/lib/mock-data';

// ✗ Bad: Inline data in endpoint
const machines = [{ id: '1', name: 'Machine 1' }];
```

### 5. Clean Services
```typescript
// ✓ Good: No mock logic in service
async getMachines() {
  const response = await apiClient.get('/machines');
  return response.data;
}

// ✗ Bad: Mock logic mixed with service
async getMachines() {
  if (USE_MOCK_DATA) {
    return MOCK_MACHINES;
  }
  const response = await apiClient.get('/machines');
  return response.data;
}
```

## Debugging

### Enable Logging

Set in `.env.development`:
```env
VITE_MOCK_API_LOGGING=true
```

You'll see console logs like:
```
[Mock API] GET /machines { params: { page: '1', pageSize: '10' } }
[Mock API] Response 200: { machines: [...], total: 12 }
```

### Check Mock Handler

The mock handler is a singleton. To debug:

```typescript
import { getMockHandler } from '@/lib/mock-api';

const handler = getMockHandler();
console.log('Mock enabled:', handler.shouldMock(config));
```

### Verify Endpoint Registration

Check that your endpoint is registered:

```typescript
import { mockEndpoints } from '@/lib/mock-api/endpoints';

console.log('Total endpoints:', mockEndpoints.length);
console.log('Endpoints:', mockEndpoints.map(e => `${e.method} ${e.path}`));
```

## Testing

### Unit Tests

Test mock endpoints independently:

```typescript
import { machinesEndpoints } from '@/lib/mock-api/endpoints/machines.endpoints';

describe('Machines Mock Endpoints', () => {
  it('should return machines list', async () => {
    const endpoint = machinesEndpoints.find(e => e.path === '/machines');
    const response = await endpoint.handler({
      method: 'GET',
      url: '/machines',
      params: { page: 1, pageSize: 10 },
    });

    expect(response.status).toBe(200);
    expect(response.data.machines).toHaveLength(10);
  });
});
```

### Integration Tests

Test with API client:

```typescript
import { apiClient } from '@/lib/api-client';

// Ensure mock is enabled
process.env.VITE_ENABLE_MOCK_API = 'true';

describe('Machine API', () => {
  it('should fetch machines', async () => {
    const response = await apiClient.get('/machines');
    expect(response.data.machines).toBeDefined();
  });
});
```

## Switching to Real API

When the backend is ready:

1. **Update environment**:
   ```env
   VITE_ENABLE_MOCK_API=false
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

2. **Restart dev server**:
   ```bash
   npm run dev
   ```

3. **No code changes needed** - services automatically use real API

## Production

In production, always use the real API:

```env
# .env.production
VITE_ENABLE_MOCK_API=false
VITE_API_BASE_URL=https://api.smartfactory.com
```

## Troubleshooting

### Mock Not Working

1. Check environment variable: `VITE_ENABLE_MOCK_API=true`
2. Restart dev server after changing `.env`
3. Check console for mock logs (if `VITE_MOCK_API_LOGGING=true`)
4. Verify endpoint is registered in `mockEndpoints` array

### Wrong Response

1. Check endpoint path matches exactly
2. Verify handler logic
3. Check mock data in `mock-data.ts`
4. Enable logging to see request/response

### Real API Called Instead

1. Ensure `VITE_ENABLE_MOCK_API=true`
2. Restart dev server
3. Clear browser cache
4. Check Network tab - should see no real requests

## Advanced Usage

### Dynamic Responses

```typescript
{
  method: 'GET',
  path: '/machines',
  handler: async (request: MockRequest) => {
    // Simulate errors occasionally
    if (Math.random() < 0.1) {
      return {
        data: { message: 'Service temporarily unavailable' },
        status: 503,
        statusText: 'Service Unavailable',
      };
    }

    // Normal response
    return { data: MOCK_MACHINES, status: 200, statusText: 'OK' };
  },
}
```

### Stateful Mocks

Mock data is mutable during development:

```typescript
// POST creates new item
MOCK_MACHINES.push(newMachine);

// PUT updates existing
MOCK_MACHINES[index] = updatedMachine;

// DELETE removes
MOCK_MACHINES.splice(index, 1);
```

Changes persist during the session but reset on page reload.

## Summary

The mock API system provides:
- ✅ **No backend dependency** - develop frontend independently
- ✅ **Realistic data** - comprehensive factory scenarios
- ✅ **Easy switching** - one environment variable
- ✅ **Type safety** - full TypeScript support
- ✅ **Debugging tools** - logging and inspection
- ✅ **Maintainable** - centralized and organized

Happy developing! 🚀
