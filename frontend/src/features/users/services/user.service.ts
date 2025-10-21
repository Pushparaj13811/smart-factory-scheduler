// User service layer

import { apiClient } from '@/lib/api-client';
import type { User } from '@/types/auth.types';
import type { UserRole } from '@/constants/roles';
import type {
  UserFilters,
  UsersResponse,
  UserFormData,
  UserUpdateData,
  UserStats,
} from '../types';

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

    const response = await apiClient.get<UsersResponse>(`/users?${params.toString()}`);
    return response.data;
  }

  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  }

  async createUser(data: UserFormData): Promise<User> {
    const response = await apiClient.post<User>('/users', data);
    return response.data;
  }

  async updateUser(data: UserUpdateData): Promise<User> {
    const { id, ...updateData } = data;
    const response = await apiClient.put<User>(`/users/${id}`, updateData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}/role`, { role });
    return response.data;
  }

  async deactivateUser(id: string): Promise<User> {
    const response = await apiClient.post<User>(`/users/${id}/deactivate`);
    return response.data;
  }

  async activateUser(id: string): Promise<User> {
    const response = await apiClient.post<User>(`/users/${id}/activate`);
    return response.data;
  }

  async getUserStats(): Promise<UserStats> {
    const response = await apiClient.get<UserStats>('/users/stats');
    return response.data;
  }
}

export const userService = new UserService();
