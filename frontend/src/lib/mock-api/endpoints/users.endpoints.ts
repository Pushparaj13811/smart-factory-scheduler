// Mock API endpoints for users

import type { MockEndpoint, MockRequest, MockResponse } from '../types';
import { MOCK_USERS } from '@/lib/mock-data';
import type { User } from '@/types/auth.types';
import type {
  UsersResponse,
  UserFormData,
  UserStats,
} from '@/features/users/types';

// In-memory user storage (extends MOCK_USERS)
let users: User[] = [...MOCK_USERS];
let nextId = users.length + 1;

export const usersEndpoints: MockEndpoint[] = [
  // GET /users
  {
    method: 'GET',
    path: '/users',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const params = request.params || {};
      const page = parseInt((params.page as string) || '1');
      const pageSize = parseInt((params.pageSize as string) || '10');
      const search = (params.search as string) || '';
      const roleFilter = params.role ? (params.role as string).split(',') : [];
      const statusFilter = params.status ? (params.status as string).split(',') : [];
      const industryId = (params.industryId as string) || '';

      let filteredUsers = [...users];

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
      }

      // Role filter
      if (roleFilter.length > 0) {
        filteredUsers = filteredUsers.filter((user) =>
          roleFilter.includes(user.role)
        );
      }

      // Industry filter
      if (industryId) {
        filteredUsers = filteredUsers.filter(
          (user) => user.industryId === industryId
        );
      }

      // Calculate pagination
      const total = filteredUsers.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      const response: UsersResponse = {
        users: paginatedUsers,
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

  // GET /users/stats
  {
    method: 'GET',
    path: '/users/stats',
    handler: async (): Promise<MockResponse> => {
      const totalUsers = users.length;
      const activeUsers = users.length; // All mock users are active
      const inactiveUsers = 0;

      // Count by role
      const byRole = Object.entries(
        users.reduce(
          (acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        )
      ).map(([role, count]) => ({
        role,
        count,
      }));

      // Recently added (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentlyAdded = users.filter(
        (user) => new Date(user.createdAt) > thirtyDaysAgo
      ).length;

      const stats: UserStats = {
        totalUsers,
        activeUsers,
        inactiveUsers,
        byRole,
        recentlyAdded,
      };

      return {
        data: stats,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // GET /users/:id
  {
    method: 'GET',
    path: '/users/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const user = users.find((u) => u.id === id);

      if (!user) {
        return {
          data: { message: 'User not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: user,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /users
  {
    method: 'POST',
    path: '/users',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const data = request.data as UserFormData;

      // Check if email already exists
      if (users.find((u) => u.email === data.email)) {
        return {
          data: { message: 'Email already exists' },
          status: 400,
          statusText: 'Bad Request',
        };
      }

      const newUser: User = {
        id: String(nextId++),
        email: data.email,
        name: data.name,
        role: data.role,
        industryId: data.industryId,
        avatar: data.avatar,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      users.push(newUser);

      return {
        data: newUser,
        status: 201,
        statusText: 'Created',
      };
    },
  },

  // PUT /users/:id
  {
    method: 'PUT',
    path: '/users/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const data = request.data as Partial<UserFormData>;

      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return {
          data: { message: 'User not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      // Check if email is being changed and already exists
      if (
        data.email &&
        data.email !== users[userIndex].email &&
        users.find((u) => u.email === data.email)
      ) {
        return {
          data: { message: 'Email already exists' },
          status: 400,
          statusText: 'Bad Request',
        };
      }

      const updatedUser: User = {
        ...users[userIndex],
        ...data,
        updatedAt: new Date(),
      };

      users[userIndex] = updatedUser;

      return {
        data: updatedUser,
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // DELETE /users/:id
  {
    method: 'DELETE',
    path: '/users/:id',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        return {
          data: { message: 'User not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      users.splice(userIndex, 1);

      return {
        data: { message: 'User deleted successfully' },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // PATCH /users/:id/role
  {
    method: 'PATCH',
    path: '/users/:id/role',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const { role } = request.data as { role: string };

      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return {
          data: { message: 'User not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      users[userIndex] = {
        ...users[userIndex],
        role,
        updatedAt: new Date(),
      };

      return {
        data: users[userIndex],
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /users/:id/deactivate
  {
    method: 'POST',
    path: '/users/:id/deactivate',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const user = users.find((u) => u.id === id);

      if (!user) {
        return {
          data: { message: 'User not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      // In a real app, you would set a status field
      // For now, just return the user
      return {
        data: {
          ...user,
          updatedAt: new Date(),
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },

  // POST /users/:id/activate
  {
    method: 'POST',
    path: '/users/:id/activate',
    handler: async (request: MockRequest): Promise<MockResponse> => {
      const id = request.params?.id as string;
      const user = users.find((u) => u.id === id);

      if (!user) {
        return {
          data: { message: 'User not found' },
          status: 404,
          statusText: 'Not Found',
        };
      }

      return {
        data: {
          ...user,
          updatedAt: new Date(),
        },
        status: 200,
        statusText: 'OK',
      };
    },
  },
];
