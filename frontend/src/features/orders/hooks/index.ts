// React Query hooks for orders

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/order.service';
import type {
  CreateOrderInput,
  UpdateOrderInput,
  OrderFilters,
  OrderStatus,
} from '../types';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, filters?: OrderFilters) =>
    [...orderKeys.lists(), { page, pageSize, filters }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  stats: () => [...orderKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch orders with pagination and filters
 */
export function useOrders(
  page: number = 1,
  pageSize: number = 10,
  filters?: OrderFilters
) {
  return useQuery({
    queryKey: orderKeys.list(page, pageSize, filters),
    queryFn: () => orderService.getOrders(page, pageSize, filters),
  });
}

/**
 * Hook to fetch a single order
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch order statistics
 */
export function useOrderStats() {
  return useQuery({
    queryKey: orderKeys.stats(),
    queryFn: () => orderService.getOrderStats(),
  });
}

/**
 * Hook to create a new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderInput) => orderService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
    },
  });
}

/**
 * Hook to update an order
 */
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderInput }) =>
      orderService.updateOrder(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
    },
  });
}

/**
 * Hook to delete an order
 */
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
    },
  });
}

/**
 * Hook to update order status
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      orderService.updateStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
    },
  });
}

/**
 * Hook to assign machine to order
 */
export function useAssignMachine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, machineId }: { id: string; machineId: string }) =>
      orderService.assignMachine(id, machineId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(data.id) });
    },
  });
}
