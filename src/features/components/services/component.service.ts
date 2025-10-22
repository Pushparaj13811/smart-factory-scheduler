// Component service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  Component,
  ComponentsResponse,
  ComponentFormData,
  ComponentFilters,
} from '../types';

export const componentService = {
  /**
   * Get all components with optional filters
   */
  async getComponents(
    page = 1,
    pageSize = 10,
    filters?: ComponentFilters
  ): Promise<ComponentsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.minQuantity) params.append('minQuantity', filters.minQuantity.toString());
    if (filters?.maxQuantity) params.append('maxQuantity', filters.maxQuantity.toString());

    const response = await apiClient.get<ComponentsResponse>(
      `/components?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a single component by ID
   */
  async getComponent(id: string): Promise<Component> {
    const response = await apiClient.get<Component>(`/components/${id}`);
    return response.data;
  },

  /**
   * Create a new component
   */
  async createComponent(data: ComponentFormData): Promise<Component> {
    const response = await apiClient.post<Component>('/components', data);
    return response.data;
  },

  /**
   * Update an existing component
   */
  async updateComponent(id: string, data: Partial<ComponentFormData>): Promise<Component> {
    const response = await apiClient.put<Component>(`/components/${id}`, data);
    return response.data;
  },

  /**
   * Delete a component
   */
  async deleteComponent(id: string): Promise<void> {
    await apiClient.delete(`/components/${id}`);
  },

  /**
   * Adjust component stock quantity
   */
  async adjustStock(id: string, quantity: number, reason: string): Promise<Component> {
    const response = await apiClient.post<Component>(`/components/${id}/adjust-stock`, {
      quantity,
      reason,
    });
    return response.data;
  },
};
