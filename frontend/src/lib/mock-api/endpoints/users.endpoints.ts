// Mock API endpoints for users

import { http, HttpResponse, delay } from 'msw';
import { MOCK_USERS } from '@/lib/mock-data';
import type { User } from '@/types/auth.types';
import type { UserRole } from '@/constants/roles';
import type {
  UsersResponse,
  UserFormData,
  UserStats,
  UserStatus,
} from '@/features/users/types';

const API_BASE_URL = '/api/users';

// In-memory user storage (extends MOCK_USERS)
let users: User[] = [...MOCK_USERS];
let nextId = users.length + 1;

export const usersEndpoints = [
  // GET /api/users - Get users list with filters
  http.get(API_BASE_URL, async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
    const search = url.searchParams.get('search') || '';
    const roleFilter = url.searchParams.get('role')?.split(',') || [];
    const statusFilter = url.searchParams.get('status')?.split(',') || [];
    const industryId = url.searchParams.get('industryId') || '';

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

    return HttpResponse.json(response);
  }),

  // GET /api/users/stats - Get user statistics
  http.get(`${API_BASE_URL}/stats`, async () => {
    await delay(300);

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
      role: role as UserRole,
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

    return HttpResponse.json(stats);
  }),

  // GET /api/users/:id - Get single user
  http.get(`${API_BASE_URL}/:id`, async ({ params }) => {
    await delay(300);

    const { id } = params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // POST /api/users - Create new user
  http.post(API_BASE_URL, async ({ request }) => {
    await delay(500);

    const data = (await request.json()) as UserFormData;

    // Check if email already exists
    if (users.find((u) => u.email === data.email)) {
      return HttpResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
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
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PUT /api/users/:id - Update user
  http.put(`${API_BASE_URL}/:id`, async ({ params, request }) => {
    await delay(500);

    const { id } = params;
    const data = (await request.json()) as Partial<UserFormData>;

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if email is being changed and already exists
    if (
      data.email &&
      data.email !== users[userIndex].email &&
      users.find((u) => u.email === data.email)
    ) {
      return HttpResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date(),
    };

    users[userIndex] = updatedUser;
    return HttpResponse.json(updatedUser);
  }),

  // DELETE /api/users/:id - Delete user
  http.delete(`${API_BASE_URL}/:id`, async ({ params }) => {
    await delay(500);

    const { id } = params;
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    users.splice(userIndex, 1);
    return HttpResponse.json({ message: 'User deleted successfully' });
  }),

  // PATCH /api/users/:id/role - Update user role
  http.patch(`${API_BASE_URL}/:id/role`, async ({ params, request }) => {
    await delay(500);

    const { id } = params;
    const { role } = (await request.json()) as { role: UserRole };

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    users[userIndex] = {
      ...users[userIndex],
      role,
      updatedAt: new Date(),
    };

    return HttpResponse.json(users[userIndex]);
  }),

  // POST /api/users/:id/deactivate - Deactivate user
  http.post(`${API_BASE_URL}/:id/deactivate`, async ({ params }) => {
    await delay(500);

    const { id } = params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // In a real app, you would set a status field
    // For now, just return the user
    return HttpResponse.json({
      ...user,
      updatedAt: new Date(),
    });
  }),

  // POST /api/users/:id/activate - Activate user
  http.post(`${API_BASE_URL}/:id/activate`, async ({ params }) => {
    await delay(500);

    const { id } = params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return HttpResponse.json({
      ...user,
      updatedAt: new Date(),
    });
  }),
];
