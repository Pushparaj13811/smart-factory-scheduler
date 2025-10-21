// Mock API endpoints for raw materials

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import { MOCK_RAW_MATERIALS } from '@/lib/mock-data';
import { MaterialStatus } from '@/features/raw-materials/types';
import type {
  RawMaterialsResponse,
  RawMaterialFormData,
  RawMaterial,
  StockAdjustment,
  ConsumptionRecord,
} from '@/features/raw-materials/types';

export const rawMaterialsEndpoints: MockEndpoint[] = [
  // GET /raw-materials
  {
    method: 'GET',
    path: '/raw-materials',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const categoryFilter = params.category as string[] | string | undefined;
      const statusFilter = params.status as string[] | string | undefined;
      const supplierFilter = params.supplier as string | undefined;
      const search = params.search as string | undefined;
      const minQuantity = params.minQuantity ? parseInt(params.minQuantity as string) : undefined;
      const maxQuantity = params.maxQuantity ? parseInt(params.maxQuantity as string) : undefined;

      let filteredMaterials = [...MOCK_RAW_MATERIALS];

      // Apply filters
      if (categoryFilter) {
        const categories = Array.isArray(categoryFilter) ? categoryFilter : [categoryFilter];
        filteredMaterials = filteredMaterials.filter((m) => categories.includes(m.category));
      }

      if (statusFilter) {
        const statuses = Array.isArray(statusFilter) ? statusFilter : [statusFilter];
        filteredMaterials = filteredMaterials.filter((m) => statuses.includes(m.status));
      }

      if (supplierFilter) {
        filteredMaterials = filteredMaterials.filter((m) =>
          m.supplier.toLowerCase().includes(supplierFilter.toLowerCase())
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredMaterials = filteredMaterials.filter(
          (m) =>
            m.name.toLowerCase().includes(searchLower) ||
            m.code.toLowerCase().includes(searchLower) ||
            m.description.toLowerCase().includes(searchLower) ||
            m.supplier.toLowerCase().includes(searchLower)
        );
      }

      if (minQuantity !== undefined) {
        filteredMaterials = filteredMaterials.filter((m) => m.quantity >= minQuantity);
      }

      if (maxQuantity !== undefined) {
        filteredMaterials = filteredMaterials.filter((m) => m.quantity <= maxQuantity);
      }

      const total = filteredMaterials.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const rawMaterials = filteredMaterials.slice(start, end);

      const response: RawMaterialsResponse = {
        rawMaterials,
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

  // GET /raw-materials/:id
  {
    method: 'GET',
    path: '/raw-materials/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const material = MOCK_RAW_MATERIALS.find((m) => m.id === id);

      if (!material) {
        return {
          data: { message: 'Raw material not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: material,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /raw-materials
  {
    method: 'POST',
    path: '/raw-materials',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as RawMaterialFormData;

      // Determine initial status based on quantity
      let status = MaterialStatus.IN_STOCK;
      if (data.quantity === 0) {
        status = MaterialStatus.OUT_OF_STOCK;
      } else if (data.quantity <= data.reorderLevel) {
        status = MaterialStatus.LOW_STOCK;
      }

      const newMaterial: RawMaterial = {
        id: `mat-${Date.now()}`,
        ...data,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_RAW_MATERIALS.push(newMaterial);

      return {
        data: newMaterial,
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // PUT /raw-materials/:id
  {
    method: 'PUT',
    path: '/raw-materials/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const data = request.data as Partial<RawMaterialFormData>;

      const index = MOCK_RAW_MATERIALS.findIndex((m) => m.id === id);
      if (index === -1) {
        return {
          data: { message: 'Raw material not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const material = MOCK_RAW_MATERIALS[index];
      const newQuantity = data.quantity ?? material.quantity;
      const newReorderLevel = data.reorderLevel ?? material.reorderLevel;

      // Update status based on new quantity
      let newStatus = material.status;
      if (newQuantity === 0) {
        newStatus = MaterialStatus.OUT_OF_STOCK;
      } else if (newQuantity <= newReorderLevel) {
        newStatus = MaterialStatus.LOW_STOCK;
      } else {
        newStatus = MaterialStatus.IN_STOCK;
      }

      const updatedMaterial = {
        ...material,
        ...data,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      MOCK_RAW_MATERIALS[index] = updatedMaterial;

      return {
        data: updatedMaterial,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // DELETE /raw-materials/:id
  {
    method: 'DELETE',
    path: '/raw-materials/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const index = MOCK_RAW_MATERIALS.findIndex((m) => m.id === id);

      if (index === -1) {
        return {
          data: { message: 'Raw material not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      MOCK_RAW_MATERIALS.splice(index, 1);

      return {
        data: { message: 'Raw material deleted successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /raw-materials/:id/adjust-stock
  {
    method: 'POST',
    path: /^\/raw-materials\/[^/]+\/adjust-stock$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const { quantity, reason } = request.data as StockAdjustment;

      const index = MOCK_RAW_MATERIALS.findIndex((m) => m.id === id);
      if (index === -1) {
        return {
          data: { message: 'Raw material not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const material = MOCK_RAW_MATERIALS[index];
      const newQuantity = material.quantity + quantity;

      // Update status based on new quantity
      let newStatus = material.status;
      if (newQuantity === 0) {
        newStatus = MaterialStatus.OUT_OF_STOCK;
      } else if (newQuantity <= material.reorderLevel) {
        newStatus = MaterialStatus.LOW_STOCK;
      } else {
        newStatus = MaterialStatus.IN_STOCK;
      }

      const updatedMaterial = {
        ...material,
        quantity: newQuantity,
        status: newStatus,
        lastRestocked: quantity > 0 ? new Date().toISOString() : material.lastRestocked,
        updatedAt: new Date().toISOString(),
      };

      MOCK_RAW_MATERIALS[index] = updatedMaterial;

      return {
        data: updatedMaterial,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /raw-materials/:id/consume
  {
    method: 'POST',
    path: /^\/raw-materials\/[^/]+\/consume$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const { quantity, purpose, consumedBy, notes } = request.data as ConsumptionRecord;

      const index = MOCK_RAW_MATERIALS.findIndex((m) => m.id === id);
      if (index === -1) {
        return {
          data: { message: 'Raw material not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const material = MOCK_RAW_MATERIALS[index];

      if (quantity > material.quantity) {
        return {
          data: { message: 'Insufficient stock for consumption' },
          status: 400,
          statusText: 'Bad Request',
        };
      }

      const newQuantity = material.quantity - quantity;

      // Update status based on new quantity
      let newStatus = material.status;
      if (newQuantity === 0) {
        newStatus = MaterialStatus.OUT_OF_STOCK;
      } else if (newQuantity <= material.reorderLevel) {
        newStatus = MaterialStatus.LOW_STOCK;
      } else {
        newStatus = MaterialStatus.IN_STOCK;
      }

      const updatedMaterial = {
        ...material,
        quantity: newQuantity,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      MOCK_RAW_MATERIALS[index] = updatedMaterial;

      return {
        data: updatedMaterial,
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
