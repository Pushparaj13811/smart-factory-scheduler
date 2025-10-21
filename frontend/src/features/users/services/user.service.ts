// User service layer

import type { User } from '@/types/auth.types';
import type { UserRole } from '@/constants/roles';
import type {
  UserFilters,
  UsersResponse,
  UserFormData,
  UserUpdateData,
  UserStats,
} from '../types';

const API_BASE_URL = '/api/users';

class UserService {
  async getUsers(
    filters?: UserFilters,
    page: number = 1,
    pageSize: number = 10
  ): Promise<UsersResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.role && filters.role.length > 0) {
      params.append('role', filters.role.join(','));
    }
    if (filters?.status && filters.status.length > 0) {
      params.append('status', filters.status.join(','));
    }
    if (filters?.industryId) {
      params.append('industryId', filters.industryId);
    }

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }

  async createUser(data: UserFormData): Promise<User> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  }

  async updateUser(data: UserUpdateData): Promise<User> {
    const { id, ...updateData } = data;
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  }

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/${id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user role');
    }
    return response.json();
  }

  async deactivateUser(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/${id}/deactivate`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to deactivate user');
    }
    return response.json();
  }

  async activateUser(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/${id}/activate`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to activate user');
    }
    return response.json();
  }

  async getUserStats(): Promise<UserStats> {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }
    return response.json();
  }
}

export const userService = new UserService();
