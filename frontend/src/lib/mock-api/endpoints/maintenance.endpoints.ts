// Mock API endpoints for maintenance

import type { MockEndpoint } from '../types';
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
    handler: (req) => {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
      const statusFilter = url.searchParams.getAll('status') as MaintenanceStatus[];
      const typeFilter = url.searchParams.getAll('type') as MaintenanceType[];
      const machineId = url.searchParams.get('machineId');
      const startDate = url.searchParams.get('startDate');
      const endDate = url.searchParams.get('endDate');
      const search = url.searchParams.get('search');

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
        records: paginatedRecords,
        total: enriched.length,
        page,
        pageSize,
      };
    },
  },

  // GET /maintenance/stats - Get maintenance statistics
  {
    method: 'GET',
    path: '/maintenance/stats',
    handler: () => {
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

      return stats;
    },
  },

  // GET /maintenance/calendar - Get calendar events
  {
    method: 'GET',
    path: '/maintenance/calendar',
    handler: (req) => {
      const url = new URL(req.url);
      const startDate = url.searchParams.get('startDate');
      const endDate = url.searchParams.get('endDate');

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

      return events;
    },
  },

  // GET /maintenance/machine/:machineId - Get maintenance records for a specific machine
  {
    method: 'GET',
    path: '/maintenance/machine/:machineId',
    handler: (req) => {
      const url = new URL(req.url);
      const pathParts = url.pathname.split('/');
      const machineId = pathParts[pathParts.length - 1];

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

      return records;
    },
  },

  // GET /maintenance/:id - Get single maintenance record
  {
    method: 'GET',
    path: '/maintenance/:id',
    handler: (req) => {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();
      let record = maintenanceRecords.find((r) => r.id === id);

      if (!record) {
        throw new Error('Maintenance record not found');
      }

      record = checkOverdue(record);
      const machine = MOCK_MACHINES.find((m) => m.id === record.machineId);

      return {
        ...record,
        machineName: machine?.name,
      };
    },
  },

  // POST /maintenance - Create new maintenance record
  {
    method: 'POST',
    path: '/maintenance',
    handler: async (req) => {
      const data = await req.json();

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
        ...newRecord,
        machineName: machine?.name,
      };
    },
  },

  // PUT /maintenance/:id - Update maintenance record
  {
    method: 'PUT',
    path: '/maintenance/:id',
    handler: async (req) => {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();
      const updates = await req.json();

      const index = maintenanceRecords.findIndex((r) => r.id === id);
      if (index === -1) {
        throw new Error('Maintenance record not found');
      }

      const updatedRecord = {
        ...maintenanceRecords[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      maintenanceRecords[index] = updatedRecord;

      const machine = MOCK_MACHINES.find((m) => m.id === updatedRecord.machineId);
      return {
        ...checkOverdue(updatedRecord),
        machineName: machine?.name,
      };
    },
  },

  // DELETE /maintenance/:id - Delete maintenance record
  {
    method: 'DELETE',
    path: '/maintenance/:id',
    handler: (req) => {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();

      const index = maintenanceRecords.findIndex((r) => r.id === id);
      if (index === -1) {
        throw new Error('Maintenance record not found');
      }

      maintenanceRecords.splice(index, 1);
      return { success: true };
    },
  },
];
