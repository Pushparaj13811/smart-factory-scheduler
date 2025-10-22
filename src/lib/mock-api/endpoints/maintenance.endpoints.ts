// Mock API endpoints for maintenance

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import { MOCK_MAINTENANCE_RECORDS, MOCK_MACHINES } from '@/lib/mock-data';
import type {
  MaintenanceRecord,
  MaintenanceStatus,
  MaintenanceType,
  MaintenanceStats,
  MaintenanceCalendarEvent,
} from '@/features/maintenance/types';

let maintenanceRecords = [...MOCK_MAINTENANCE_RECORDS];

// Helper to check if a maintenance is overdue
function checkOverdue(record: MaintenanceRecord): MaintenanceRecord {
  if (
    record.status === 'scheduled' &&
    new Date(record.scheduledDate) < new Date()
  ) {
    return { ...record, status: 'overdue' as MaintenanceStatus };
  }
  return record;
}

export const maintenanceEndpoints: MockEndpoint[] = [
  // GET /maintenance - Get all maintenance records with filters
  {
    method: 'GET',
    path: '/maintenance',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const statusParam = params.status as string;
      const typeParam = params.type as string;
      const statusFilter = statusParam ? statusParam.split(',') as MaintenanceStatus[] : [];
      const typeFilter = typeParam ? typeParam.split(',') as MaintenanceType[] : [];
      const machineId = params.machineId as string;
      const startDate = params.startDate as string;
      const endDate = params.endDate as string;
      const search = params.search as string;

      let filtered = maintenanceRecords.map(checkOverdue);

      // Apply status filter
      if (statusFilter.length > 0) {
        filtered = filtered.filter((record) => statusFilter.includes(record.status));
      }

      // Apply type filter
      if (typeFilter.length > 0) {
        filtered = filtered.filter((record) => typeFilter.includes(record.type));
      }

      // Apply machine filter
      if (machineId) {
        filtered = filtered.filter((record) => record.machineId === machineId);
      }

      // Apply date range filter
      if (startDate) {
        filtered = filtered.filter(
          (record) => new Date(record.scheduledDate) >= new Date(startDate)
        );
      }
      if (endDate) {
        filtered = filtered.filter(
          (record) => new Date(record.scheduledDate) <= new Date(endDate)
        );
      }

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter((record) => {
          const machine = MOCK_MACHINES.find((m) => m.id === record.machineId);
          return (
            record.description?.toLowerCase().includes(searchLower) ||
            record.notes?.toLowerCase().includes(searchLower) ||
            record.technician?.toLowerCase().includes(searchLower) ||
            machine?.name.toLowerCase().includes(searchLower)
          );
        });
      }

      // Enrich with machine name
      const enriched = filtered.map((record) => {
        const machine = MOCK_MACHINES.find((m) => m.id === record.machineId);
        return {
          ...record,
          machineName: machine?.name,
        };
      });

      // Pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedRecords = enriched.slice(start, end);

      return {
        data: {
          records: paginatedRecords,
          total: enriched.length,
          page,
          pageSize,
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /maintenance/stats - Get maintenance statistics
  {
    method: 'GET',
    path: '/maintenance/stats',
    handler: async (): Promise<MockResponse> => {
      const records = maintenanceRecords.map(checkOverdue);

      const stats: MaintenanceStats = {
        total: records.length,
        scheduled: records.filter((r) => r.status === 'scheduled').length,
        inProgress: records.filter((r) => r.status === 'in_progress').length,
        completed: records.filter((r) => r.status === 'completed').length,
        cancelled: records.filter((r) => r.status === 'cancelled').length,
        overdue: records.filter((r) => r.status === 'overdue').length,
        totalCost: records
          .filter((r) => r.cost)
          .reduce((sum, r) => sum + (r.cost || 0), 0),
        averageCost:
          records.filter((r) => r.cost).reduce((sum, r) => sum + (r.cost || 0), 0) /
          (records.filter((r) => r.cost).length || 1),
      };

      return {
        data: stats,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /maintenance/calendar - Get calendar events
  {
    method: 'GET',
    path: '/maintenance/calendar',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const startDate = params.startDate as string;
      const endDate = params.endDate as string;

      let filtered = maintenanceRecords.map(checkOverdue);

      // Apply date range filter
      if (startDate) {
        filtered = filtered.filter(
          (record) => new Date(record.scheduledDate) >= new Date(startDate)
        );
      }
      if (endDate) {
        filtered = filtered.filter(
          (record) => new Date(record.scheduledDate) <= new Date(endDate)
        );
      }

      const events: MaintenanceCalendarEvent[] = filtered.map((record) => {
        const machine = MOCK_MACHINES.find((m) => m.id === record.machineId);
        return {
          id: record.id,
          title: record.description || 'Maintenance',
          date: record.scheduledDate,
          type: record.type,
          status: record.status,
          machineId: record.machineId,
          machineName: machine?.name,
        };
      });

      return {
        data: events,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /maintenance/machine/:machineId - Get maintenance records for a specific machine
  {
    method: 'GET',
    path: '/maintenance/machine/:machineId',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const machineId = request.params?.machineId as string;

      const records = maintenanceRecords
        .filter((r) => r.machineId === machineId)
        .map(checkOverdue)
        .map((record) => {
          const machine = MOCK_MACHINES.find((m) => m.id === record.machineId);
          return {
            ...record,
            machineName: machine?.name,
          };
        });

      return {
        data: records,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /maintenance/:id - Get single maintenance record
  {
    method: 'GET',
    path: '/maintenance/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      let record = maintenanceRecords.find((r) => r.id === id);

      if (!record) {
        return {
          data: { message: 'Maintenance record not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      record = checkOverdue(record);
      const machine = MOCK_MACHINES.find((m) => m.id === record.machineId);

      return {
        data: {
          ...record,
          machineName: machine?.name,
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /maintenance - Create new maintenance record
  {
    method: 'POST',
    path: '/maintenance',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as any;

      const newRecord: MaintenanceRecord = {
        id: `maint-${Date.now()}`,
        machineId: data.machineId,
        type: data.type,
        status: 'scheduled',
        scheduledDate: data.scheduledDate,
        technician: data.technician,
        notes: data.notes,
        description: data.description,
        industryId: 'industry-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      maintenanceRecords.push(newRecord);

      const machine = MOCK_MACHINES.find((m) => m.id === newRecord.machineId);
      return {
        data: {
          ...newRecord,
          machineName: machine?.name,
        },
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // PUT /maintenance/:id - Update maintenance record
  {
    method: 'PUT',
    path: '/maintenance/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const updates = request.data as any;

      const index = maintenanceRecords.findIndex((r) => r.id === id);
      if (index === -1) {
        return {
          data: { message: 'Maintenance record not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const updatedRecord = {
        ...maintenanceRecords[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      maintenanceRecords[index] = updatedRecord;

      const machine = MOCK_MACHINES.find((m) => m.id === updatedRecord.machineId);
      return {
        data: {
          ...checkOverdue(updatedRecord),
          machineName: machine?.name,
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // DELETE /maintenance/:id - Delete maintenance record
  {
    method: 'DELETE',
    path: '/maintenance/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;

      const index = maintenanceRecords.findIndex((r) => r.id === id);
      if (index === -1) {
        return {
          data: { message: 'Maintenance record not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      maintenanceRecords.splice(index, 1);
      return {
        data: { message: 'Maintenance record deleted successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
