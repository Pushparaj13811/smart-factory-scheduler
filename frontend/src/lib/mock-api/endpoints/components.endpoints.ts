// Mock API endpoints for components

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import { MOCK_COMPONENTS } from '@/lib/mock-data';
import { ComponentStatus } from '@/features/components/types';
import type {
  ComponentsResponse,
  ComponentFormData,
  Component,
} from '@/features/components/types';

export const componentsEndpoints: MockEndpoint[] = [
  // GET /components
  {
    method: 'GET',
    path: '/components',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const categoryFilter = params.category as string[] | string | undefined;
      const statusFilter = params.status as string[] | string | undefined;
      const search = params.search as string | undefined;
      const minQuantity = params.minQuantity ? parseInt(params.minQuantity as string) : undefined;
      const maxQuantity = params.maxQuantity ? parseInt(params.maxQuantity as string) : undefined;

      let filteredComponents = [...MOCK_COMPONENTS];

      // Apply filters
      if (categoryFilter) {
        const categories = Array.isArray(categoryFilter) ? categoryFilter : [categoryFilter];
        filteredComponents = filteredComponents.filter((c) => categories.includes(c.category));
      }

      if (statusFilter) {
        const statuses = Array.isArray(statusFilter) ? statusFilter : [statusFilter];
        filteredComponents = filteredComponents.filter((c) => statuses.includes(c.status));
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredComponents = filteredComponents.filter(
          (c) =>
            c.name.toLowerCase().includes(searchLower) ||
            c.code.toLowerCase().includes(searchLower) ||
            c.description.toLowerCase().includes(searchLower)
        );
      }

      if (minQuantity !== undefined) {
        filteredComponents = filteredComponents.filter((c) => c.quantityInStock >= minQuantity);
      }

      if (maxQuantity !== undefined) {
        filteredComponents = filteredComponents.filter((c) => c.quantityInStock <= maxQuantity);
      }

      const total = filteredComponents.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const components = filteredComponents.slice(start, end);

      const response: ComponentsResponse = {
        components,
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

  // GET /components/:id
  {
    method: 'GET',
    path: '/components/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const component = MOCK_COMPONENTS.find((c) => c.id === id);

      if (!component) {
        return {
          data: { message: 'Component not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: component,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /components
  {
    method: 'POST',
    path: '/components',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as ComponentFormData;

      const newComponent: Component = {
        id: `comp-${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_COMPONENTS.push(newComponent);

      return {
        data: newComponent,
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // PUT /components/:id
  {
    method: 'PUT',
    path: '/components/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const data = request.data as Partial<ComponentFormData>;

      const index = MOCK_COMPONENTS.findIndex((c) => c.id === id);
      if (index === -1) {
        return {
          data: { message: 'Component not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const updatedComponent = {
        ...MOCK_COMPONENTS[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      MOCK_COMPONENTS[index] = updatedComponent;

      return {
        data: updatedComponent,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // DELETE /components/:id
  {
    method: 'DELETE',
    path: '/components/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const index = MOCK_COMPONENTS.findIndex((c) => c.id === id);

      if (index === -1) {
        return {
          data: { message: 'Component not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      MOCK_COMPONENTS.splice(index, 1);

      return {
        data: { message: 'Component deleted successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /components/:id/adjust-stock
  {
    method: 'POST',
    path: /^\/components\/[^/]+\/adjust-stock$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const { quantity, reason } = request.data as { quantity: number; reason: string };

      const index = MOCK_COMPONENTS.findIndex((c) => c.id === id);
      if (index === -1) {
        return {
          data: { message: 'Component not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const component = MOCK_COMPONENTS[index];
      const newQuantity = component.quantityInStock + quantity;

      // Update status based on new quantity
      let newStatus = component.status;
      if (newQuantity === 0) {
        newStatus = ComponentStatus.OUT_OF_STOCK;
      } else if (newQuantity <= component.reorderLevel) {
        newStatus = ComponentStatus.LOW_STOCK;
      } else {
        newStatus = ComponentStatus.IN_STOCK;
      }

      const updatedComponent = {
        ...component,
        quantityInStock: newQuantity,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      MOCK_COMPONENTS[index] = updatedComponent;

      return {
        data: updatedComponent,
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
