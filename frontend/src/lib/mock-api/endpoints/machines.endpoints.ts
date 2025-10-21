// Mock API endpoints for machines

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import {
  MOCK_MACHINES,
  MOCK_MACHINE_STATS,
  MOCK_MAINTENANCE_RECORDS,
} from '@/lib/mock-data';
import { MachineStatus, MaintenanceStatus } from '@/features/machines/types';
import type {
  MachinesResponse,
  CreateMachineInput,
  UpdateMachineInput,
  Machine,
  MaintenanceType,
  MaintenanceRecord,
} from '@/features/machines/types';

export const machinesEndpoints: MockEndpoint[] = [
  // GET /machines
  {
    method: 'GET',
    path: '/machines',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const statusFilter = params.status as string[] | string | undefined;
      const typeFilter = params.type as string[] | string | undefined;
      const locationFilter = params.location as string[] | string | undefined;
      const search = params.search as string | undefined;

      let filteredMachines = [...MOCK_MACHINES];

      // Apply filters
      if (statusFilter) {
        const statuses = Array.isArray(statusFilter) ? statusFilter : [statusFilter];
        filteredMachines = filteredMachines.filter((m) => statuses.includes(m.status));
      }

      if (typeFilter) {
        const types = Array.isArray(typeFilter) ? typeFilter : [typeFilter];
        filteredMachines = filteredMachines.filter((m) => types.includes(m.type));
      }

      if (locationFilter) {
        const locations = Array.isArray(locationFilter) ? locationFilter : [locationFilter];
        filteredMachines = filteredMachines.filter((m) => locations.includes(m.location));
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredMachines = filteredMachines.filter(
          (m) =>
            m.name.toLowerCase().includes(searchLower) ||
            m.model.toLowerCase().includes(searchLower) ||
            m.manufacturer.toLowerCase().includes(searchLower)
        );
      }

      const total = filteredMachines.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const machines = filteredMachines.slice(start, end);

      const response: MachinesResponse = {
        machines,
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

  // GET /machines/stats
  {
    method: 'GET',
    path: '/machines/stats',
    handler: async (): Promise<MockResponse> => {
      return {
        data: MOCK_MACHINE_STATS,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /machines/:id
  {
    method: 'GET',
    path: '/machines/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const machine = MOCK_MACHINES.find((m) => m.id === id);

      if (!machine) {
        return {
          data: { message: 'Machine not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: machine,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /machines
  {
    method: 'POST',
    path: '/machines',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as CreateMachineInput;

      const newMachine: Machine = {
        id: `machine-${Date.now()}`,
        ...data,
        status: MachineStatus.OFFLINE,
        industryId: 'mock-industry-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_MACHINES.push(newMachine);

      return {
        data: newMachine,
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // PUT /machines/:id
  {
    method: 'PUT',
    path: '/machines/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const data = request.data as UpdateMachineInput;

      const index = MOCK_MACHINES.findIndex((m) => m.id === id);
      if (index === -1) {
        return {
          data: { message: 'Machine not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const updatedMachine = {
        ...MOCK_MACHINES[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      MOCK_MACHINES[index] = updatedMachine;

      return {
        data: updatedMachine,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // DELETE /machines/:id
  {
    method: 'DELETE',
    path: '/machines/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const index = MOCK_MACHINES.findIndex((m) => m.id === id);

      if (index === -1) {
        return {
          data: { message: 'Machine not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      MOCK_MACHINES.splice(index, 1);

      return {
        data: { message: 'Machine deleted successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /machines/:id/maintenance
  {
    method: 'GET',
    path: /^\/machines\/[^/]+\/maintenance$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const records = MOCK_MAINTENANCE_RECORDS.filter((r) => r.machineId === id);

      return {
        data: records,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /machines/:id/maintenance
  {
    method: 'POST',
    path: /^\/machines\/[^/]+\/maintenance$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const data = request.data as {
        type: string;
        scheduledDate: string;
        description: string;
      };

      const newRecord: MaintenanceRecord = {
        id: `maintenance-${Date.now()}`,
        machineId: id,
        type: data.type as MaintenanceType,
        status: MaintenanceStatus.PENDING,
        scheduledDate: data.scheduledDate,
        description: data.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_MAINTENANCE_RECORDS.push(newRecord);

      return {
        data: newRecord,
        status: 201,
        statusText: 'Created',
      };
    },
  },
];
