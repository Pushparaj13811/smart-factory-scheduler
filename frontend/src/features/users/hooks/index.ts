// User management hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';
import type {
  UserFilters,
  UserFormData,
  UserUpdateData,
} from '../types';
import type { UserRole } from '@/constants/roles';

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
