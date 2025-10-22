// User management hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { userService } from '../services/user.service';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/constants/roles';
import type {
  UserFilters,
  UserFormData,
  UserUpdateData,
} from '../types';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters?: UserFilters, page?: number, pageSize?: number) =>
    [...userKeys.lists(), { filters, page, pageSize }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  stats: () => [...userKeys.all, 'stats'] as const,
};

// Hook to fetch users list
export function useUsers(filters?: UserFilters, page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: userKeys.list(filters, page, pageSize),
    queryFn: () => userService.getUsers(filters, page, pageSize),
  });
}

// Hook to fetch a single user
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
}

// Hook to fetch user stats
export function useUserStats() {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: () => userService.getUserStats(),
  });
}

// Hook to create a user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserFormData) => userService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
}

// Hook to update a user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateData) => userService.updateUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
}

// Hook to delete a user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
}

// Hook to update user role
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      userService.updateRole(id, role),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
}

// Hook to deactivate a user
export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deactivateUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
}

// Hook to activate a user
export function useActivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.activateUser(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
    },
  });
}

/**
 * Hook to get role-based filters for user list
 * Automatically applies filters based on the current user's role:
 * - SYSTEM_ADMIN: No automatic filters (sees all users)
 * - INDUSTRY_OWNER: Filters by industryId (sees only their industry's users)
 * - ADMINISTRATOR: Filters by industryId (sees only their industry's users)
 * - SUPERVISOR: Filters by supervisorId (sees only their team members)
 * - WORKER: Should not have access to user management (but if they do, shows only themselves)
 */
export function useRoleBasedUserFilters(): UserFilters | undefined {
  const { user, isSystemAdmin, isIndustryOwner, isAdministrator, isSupervisor, isWorker } = useAuth();

  return useMemo(() => {
    if (!user) return undefined;

    const filters: UserFilters = {};

    // System admin sees all users across all industries
    if (isSystemAdmin()) {
      return undefined; // No filters
    }

    // Industry owner and admin see only users in their industry
    if (isIndustryOwner() || isAdministrator()) {
      if (user.industryId) {
        filters.industryId = user.industryId;
      }
      return filters;
    }

    // Supervisor sees only their team members (users with supervisorId = current user's id)
    if (isSupervisor()) {
      filters.supervisorId = user.id;
      if (user.industryId) {
        filters.industryId = user.industryId;
      }
      return filters;
    }

    // Workers should not have access to user management
    // But if they somehow do, they can only see themselves
    if (isWorker()) {
      filters.search = user.email; // Filter to only show themselves
      if (user.industryId) {
        filters.industryId = user.industryId;
      }
      return filters;
    }

    return undefined;
  }, [user, isSystemAdmin, isIndustryOwner, isAdministrator, isSupervisor, isWorker]);
}
