// Mock API endpoints for schedule

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import { MOCK_SCHEDULE_TASKS } from '@/lib/mock-data';
import { TaskStatus } from '@/features/schedule/types';
import type {
  TasksResponse,
  CreateTaskInput,
  UpdateTaskInput,
  ScheduleTask,
  TaskStats,
  OptimizeScheduleResult,
  ReassignTaskInput,
} from '@/features/schedule/types';

export const scheduleEndpoints: MockEndpoint[] = [
  // GET /schedule/tasks
  {
    method: 'GET',
    path: '/schedule/tasks',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const statusFilter = params.status as string[] | string | undefined;
      const priorityFilter = params.priority as string[] | string | undefined;
      const machineIdFilter = params.machineId as string[] | string | undefined;
      const assignedToFilter = params.assignedTo as string[] | string | undefined;
      const startDate = params.startDate as string | undefined;
      const endDate = params.endDate as string | undefined;
      const search = params.search as string | undefined;

      let filteredTasks = [...MOCK_SCHEDULE_TASKS];

      // Apply filters
      if (statusFilter) {
        const statuses = Array.isArray(statusFilter) ? statusFilter : [statusFilter];
        filteredTasks = filteredTasks.filter((t) => statuses.includes(t.status));
      }

      if (priorityFilter) {
        const priorities = Array.isArray(priorityFilter) ? priorityFilter : [priorityFilter];
        filteredTasks = filteredTasks.filter((t) => priorities.includes(t.priority));
      }

      if (machineIdFilter) {
        const machineIds = Array.isArray(machineIdFilter) ? machineIdFilter : [machineIdFilter];
        filteredTasks = filteredTasks.filter((t) => t.machineId && machineIds.includes(t.machineId));
      }

      if (assignedToFilter) {
        const assignees = Array.isArray(assignedToFilter) ? assignedToFilter : [assignedToFilter];
        filteredTasks = filteredTasks.filter((t) => t.assignedTo && assignees.includes(t.assignedTo));
      }

      if (startDate) {
        filteredTasks = filteredTasks.filter((t) => new Date(t.startTime) >= new Date(startDate));
      }

      if (endDate) {
        filteredTasks = filteredTasks.filter((t) => new Date(t.endTime) <= new Date(endDate));
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredTasks = filteredTasks.filter(
          (t) =>
            t.title.toLowerCase().includes(searchLower) ||
            t.description?.toLowerCase().includes(searchLower) ||
            t.machineName?.toLowerCase().includes(searchLower) ||
            t.componentName?.toLowerCase().includes(searchLower)
        );
      }

      const total = filteredTasks.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const tasks = filteredTasks.slice(start, end);

      const response: TasksResponse = {
        tasks,
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

  // GET /schedule/stats
  {
    method: 'GET',
    path: '/schedule/stats',
    handler: async (): Promise<MockResponse> => {
      const stats: TaskStats = {
        total: MOCK_SCHEDULE_TASKS.length,
        scheduled: MOCK_SCHEDULE_TASKS.filter((t) => t.status === TaskStatus.SCHEDULED).length,
        inProgress: MOCK_SCHEDULE_TASKS.filter((t) => t.status === TaskStatus.IN_PROGRESS).length,
        completed: MOCK_SCHEDULE_TASKS.filter((t) => t.status === TaskStatus.COMPLETED).length,
        delayed: MOCK_SCHEDULE_TASKS.filter((t) => t.status === TaskStatus.DELAYED).length,
        cancelled: MOCK_SCHEDULE_TASKS.filter((t) => t.status === TaskStatus.CANCELLED).length,
        completionRate: Math.round(
          (MOCK_SCHEDULE_TASKS.filter((t) => t.status === TaskStatus.COMPLETED).length /
            MOCK_SCHEDULE_TASKS.length) *
            100
        ),
        averageDelay: 15, // Mock value
      };

      return {
        data: stats,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /schedule/tasks/:id
  {
    method: 'GET',
    path: '/schedule/tasks/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const task = MOCK_SCHEDULE_TASKS.find((t) => t.id === id);

      if (!task) {
        return {
          data: { message: 'Task not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: task,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /schedule/tasks
  {
    method: 'POST',
    path: '/schedule/tasks',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as CreateTaskInput;

      const newTask: ScheduleTask = {
        id: `task-${Date.now()}`,
        ...data,
        status: TaskStatus.SCHEDULED,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      MOCK_SCHEDULE_TASKS.push(newTask);

      return {
        data: newTask,
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // PUT /schedule/tasks/:id
  {
    method: 'PUT',
    path: '/schedule/tasks/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const data = request.data as UpdateTaskInput;

      const index = MOCK_SCHEDULE_TASKS.findIndex((t) => t.id === id);
      if (index === -1) {
        return {
          data: { message: 'Task not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const updatedTask = {
        ...MOCK_SCHEDULE_TASKS[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      MOCK_SCHEDULE_TASKS[index] = updatedTask;

      return {
        data: updatedTask,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // DELETE /schedule/tasks/:id
  {
    method: 'DELETE',
    path: '/schedule/tasks/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const index = MOCK_SCHEDULE_TASKS.findIndex((t) => t.id === id);

      if (index === -1) {
        return {
          data: { message: 'Task not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      MOCK_SCHEDULE_TASKS.splice(index, 1);

      return {
        data: { message: 'Task deleted successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /schedule/optimize
  {
    method: 'POST',
    path: '/schedule/optimize',
    handler: async (): Promise<MockResponse> => {
      const result: OptimizeScheduleResult = {
        optimizedTasks: MOCK_SCHEDULE_TASKS,
        conflicts: [
          {
            taskId: 'task-1',
            conflictingTaskId: 'task-5',
            reason: 'Both tasks assigned to same machine with overlapping time',
            severity: 'warning',
          },
        ],
        suggestions: [
          'Consider reassigning task-5 to an available machine',
          'Adjust task-1 start time to reduce overlap',
          'Balance workload across multiple machines',
        ],
        estimatedImprovement: 15,
      };

      return {
        data: result,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /schedule/tasks/:id/reassign
  {
    method: 'POST',
    path: /^\/schedule\/tasks\/[^/]+\/reassign$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as ReassignTaskInput;
      const index = MOCK_SCHEDULE_TASKS.findIndex((t) => t.id === data.taskId);

      if (index === -1) {
        return {
          data: { message: 'Task not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      const updatedTask = {
        ...MOCK_SCHEDULE_TASKS[index],
        machineId: data.newMachineId || MOCK_SCHEDULE_TASKS[index].machineId,
        assignedTo: data.newAssignedTo || MOCK_SCHEDULE_TASKS[index].assignedTo,
        startTime: data.newStartTime || MOCK_SCHEDULE_TASKS[index].startTime,
        endTime: data.newEndTime || MOCK_SCHEDULE_TASKS[index].endTime,
        updatedAt: new Date().toISOString(),
      };

      MOCK_SCHEDULE_TASKS[index] = updatedTask;

      return {
        data: updatedTask,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /schedule/tasks/machine/:machineId
  {
    method: 'GET',
    path: /^\/schedule\/tasks\/machine\/[^/]+$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const machineId = request.params?.machineId as string;
      const tasks = MOCK_SCHEDULE_TASKS.filter((t) => t.machineId === machineId);

      return {
        data: tasks,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /schedule/tasks/order/:orderId
  {
    method: 'GET',
    path: /^\/schedule\/tasks\/order\/[^/]+$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const orderId = request.params?.orderId as string;
      const tasks = MOCK_SCHEDULE_TASKS.filter((t) => t.orderId === orderId);

      return {
        data: tasks,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /schedule/tasks/assignee/:userId
  {
    method: 'GET',
    path: /^\/schedule\/tasks\/assignee\/[^/]+$/,
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const userId = request.params?.userId as string;
      const tasks = MOCK_SCHEDULE_TASKS.filter((t) => t.assignedTo === userId);

      return {
        data: tasks,
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
