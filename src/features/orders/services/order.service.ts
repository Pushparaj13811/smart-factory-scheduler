// Order service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  Order,
  OrdersResponse,
  CreateOrderInput,
  UpdateOrderInput,
  OrderFilters,
  OrderStats,
  OrderStatus,
} from '../types';

export const orderService = {
  /**
   * Get all orders with optional filters
   */
  async getOrders(
    page: number = 1,
    pageSize: number = 10,
    filters?: OrderFilters
  ): Promise<OrdersResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.status) {
      filters.status.forEach((s) => params.append('status', s));
    }
    if (filters?.priority) {
      filters.priority.forEach((p) => params.append('priority', p));
    }
    if (filters?.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters?.endDate) {
      params.append('endDate', filters.endDate);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await apiClient.get<OrdersResponse>(
      `/orders?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a single order by ID
   */
  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  /**
   * Create a new order
   */
  async createOrder(data: CreateOrderInput): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', data);
    return response.data;
  },

  /**
   * Update an existing order
   */
  async updateOrder(id: string, data: UpdateOrderInput): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${id}`, data);
    return response.data;
  },

  /**
   * Delete an order
   */
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  },

  /**
   * Update order status
   */
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    return this.updateOrder(id, { status });
  },

  /**
   * Assign machine to order
   */
  async assignMachine(id: string, machineId: string): Promise<Order> {
    return this.updateOrder(id, { assignedMachineId: machineId });
  },

  /**
   * Get order statistics
   */
  async getOrderStats(): Promise<OrderStats> {
    const response = await apiClient.get<OrderStats>('/orders/stats');
    return response.data;
  },
};
