// Raw Material service for API integration

import { apiClient } from '@/lib/api-client';
import type {
  RawMaterial,
  RawMaterialsResponse,
  RawMaterialFormData,
  RawMaterialFilters,
  StockAdjustment,
  ConsumptionRecord,
} from '../types';

export const rawMaterialService = {
  /**
   * Get all raw materials with optional filters
   */
  async getRawMaterials(
    page = 1,
    pageSize = 10,
    filters?: RawMaterialFilters
  ): Promise<RawMaterialsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.supplier) params.append('supplier', filters.supplier);
    if (filters?.minQuantity) params.append('minQuantity', filters.minQuantity.toString());
    if (filters?.maxQuantity) params.append('maxQuantity', filters.maxQuantity.toString());

    const response = await apiClient.get<RawMaterialsResponse>(
      `/raw-materials?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get a single raw material by ID
   */
  async getRawMaterial(id: string): Promise<RawMaterial> {
    const response = await apiClient.get<RawMaterial>(`/raw-materials/${id}`);
    return response.data;
  },

  /**
   * Create a new raw material
   */
  async createRawMaterial(data: RawMaterialFormData): Promise<RawMaterial> {
    const response = await apiClient.post<RawMaterial>('/raw-materials', data);
    return response.data;
  },

  /**
   * Update an existing raw material
   */
  async updateRawMaterial(id: string, data: Partial<RawMaterialFormData>): Promise<RawMaterial> {
    const response = await apiClient.put<RawMaterial>(`/raw-materials/${id}`, data);
    return response.data;
  },

  /**
   * Delete a raw material
   */
  async deleteRawMaterial(id: string): Promise<void> {
    await apiClient.delete(`/raw-materials/${id}`);
  },

  /**
   * Adjust raw material stock quantity
   */
  async adjustStock(id: string, adjustment: StockAdjustment): Promise<RawMaterial> {
    const response = await apiClient.post<RawMaterial>(
      `/raw-materials/${id}/adjust-stock`,
      adjustment
    );
    return response.data;
  },

  /**
   * Record raw material consumption
   */
  async recordConsumption(id: string, consumption: ConsumptionRecord): Promise<RawMaterial> {
    const response = await apiClient.post<RawMaterial>(
      `/raw-materials/${id}/consume`,
      consumption
    );
    return response.data;
  },
};
