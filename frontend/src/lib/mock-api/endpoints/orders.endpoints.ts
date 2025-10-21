// Mock API endpoints for orders
// @ts-nocheck - Mock API file with loose types

import type { MockEndpoint } from '../types';
import { MOCK_ORDERS, MOCK_ORDER_STATS } from '@/lib/mock-data';
import type { Order, OrderStatus, OrderPriority } from '@/features/orders/types';

let orders = [...MOCK_ORDERS];

export const ordersEndpoints: MockEndpoint[] = [
  // GET /orders - Get all orders with filters
  {
    method: 'GET',
    path: '/orders',
    handler: (req) => {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
      const statusFilter = url.searchParams.getAll('status') as OrderStatus[];
      const priorityFilter = url.searchParams.getAll('priority') as OrderPriority[];
      const startDate = url.searchParams.get('startDate');
      const endDate = url.searchParams.get('endDate');
      const search = url.searchParams.get('search');

      let filtered = [...orders];

      // Apply status filter
      if (statusFilter.length > 0) {
        filtered = filtered.filter((order) => statusFilter.includes(order.status));
      }

      // Apply priority filter
      if (priorityFilter.length > 0) {
        filtered = filtered.filter((order) =>
          priorityFilter.includes(order.priority)
        );
      }

      // Apply date range filter
      if (startDate) {
        filtered = filtered.filter(
          (order) => new Date(order.dueDate) >= new Date(startDate)
        );
      }
      if (endDate) {
        filtered = filtered.filter(
          (order) => new Date(order.dueDate) <= new Date(endDate)
        );
      }

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (order) =>
            order.orderNumber.toLowerCase().includes(searchLower) ||
            order.customer.name.toLowerCase().includes(searchLower) ||
            order.customer.company?.toLowerCase().includes(searchLower) ||
            order.items.some((item) =>
              item.componentName?.toLowerCase().includes(searchLower)
            )
        );
      }

      // Pagination
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedOrders = filtered.slice(start, end);

      return {
        orders: paginatedOrders,
        total: filtered.length,
        page,
        pageSize,
      };
    },
  },

  // GET /orders/stats - Get order statistics
  {
    method: 'GET',
    path: '/orders/stats',
    handler: () => {
      return MOCK_ORDER_STATS;
    },
  },

  // GET /orders/:id - Get single order
  {
    method: 'GET',
    path: '/orders/:id',
    handler: (req) => {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();
      const order = orders.find((m) => m.id === id);

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    },
  },

  // POST /orders - Create new order
  {
    method: 'POST',
    path: '/orders',
    handler: async (req) => {
      const data = await req.json();

      // Calculate totals
      let totalQuantity = 0;
      let totalAmount = 0;
      const items = data.items.map((item: any) => {
        const itemTotal = item.quantity * item.unitPrice;
        totalQuantity += item.quantity;
        totalAmount += itemTotal;
        return {
          ...item,
          totalPrice: itemTotal,
        };
      });

      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber: data.orderNumber,
        customer: data.customer,
        items,
        totalQuantity,
        totalAmount,
        status: 'pending',
        priority: data.priority,
        dueDate: data.dueDate,
        notes: data.notes,
        industryId: 'industry-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      orders.push(newOrder);
      return newOrder;
    },
  },

  // PUT /orders/:id - Update order
  {
    method: 'PUT',
    path: '/orders/:id',
    handler: async (req) => {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();
      const updates = await req.json();

      const index = orders.findIndex((m) => m.id === id);
      if (index === -1) {
        throw new Error('Order not found');
      }

      let updatedOrder = { ...orders[index] };

      // If items are being updated, recalculate totals
      if (updates.items) {
        let totalQuantity = 0;
        let totalAmount = 0;
        const items = updates.items.map((item: any) => {
          const itemTotal = item.quantity * item.unitPrice;
          totalQuantity += item.quantity;
          totalAmount += itemTotal;
          return {
            ...item,
            totalPrice: itemTotal,
          };
        });
        updatedOrder.items = items;
        updatedOrder.totalQuantity = totalQuantity;
        updatedOrder.totalAmount = totalAmount;
      }

      // Apply other updates
      updatedOrder = {
        ...updatedOrder,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      orders[index] = updatedOrder;
      return updatedOrder;
    },
  },

  // DELETE /orders/:id - Delete order
  {
    method: 'DELETE',
    path: '/orders/:id',
    handler: (req) => {
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop();

      const index = orders.findIndex((m) => m.id === id);
      if (index === -1) {
        throw new Error('Order not found');
      }

      orders.splice(index, 1);
      return { success: true };
    },
  },
];
