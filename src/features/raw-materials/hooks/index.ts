// Raw Material React Query hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rawMaterialService } from '../services/raw-material.service';
import { toast } from 'sonner';
import type {
  RawMaterialFilters,
  RawMaterialFormData,
  StockAdjustment,
  ConsumptionRecord,
} from '../types';

// Query hooks
export function useRawMaterials(page = 1, pageSize = 10, filters?: RawMaterialFilters) {
  return useQuery({
    queryKey: ['rawMaterials', page, pageSize, filters],
    queryFn: () => rawMaterialService.getRawMaterials(page, pageSize, filters),
  });
}

export function useRawMaterial(id: string) {
  return useQuery({
    queryKey: ['rawMaterial', id],
    queryFn: () => rawMaterialService.getRawMaterial(id),
    enabled: !!id,
  });
}

// Mutation hooks
export function useCreateRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RawMaterialFormData) => rawMaterialService.createRawMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
      toast.success('Raw material created successfully');
    },
    onError: () => {
      toast.error('Failed to create raw material');
    },
  });
}

export function useUpdateRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RawMaterialFormData> }) =>
      rawMaterialService.updateRawMaterial(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
      queryClient.invalidateQueries({ queryKey: ['rawMaterial', variables.id] });
      toast.success('Raw material updated successfully');
    },
    onError: () => {
      toast.error('Failed to update raw material');
    },
  });
}

export function useDeleteRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rawMaterialService.deleteRawMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
      toast.success('Raw material deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete raw material');
    },
  });
}

export function useAdjustStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, adjustment }: { id: string; adjustment: StockAdjustment }) =>
      rawMaterialService.adjustStock(id, adjustment),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
      queryClient.invalidateQueries({ queryKey: ['rawMaterial', variables.id] });
      toast.success('Stock adjusted successfully');
    },
    onError: () => {
      toast.error('Failed to adjust stock');
    },
  });
}

export function useRecordConsumption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, consumption }: { id: string; consumption: ConsumptionRecord }) =>
      rawMaterialService.recordConsumption(id, consumption),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
      queryClient.invalidateQueries({ queryKey: ['rawMaterial', variables.id] });
      toast.success('Consumption recorded successfully');
    },
    onError: () => {
      toast.error('Failed to record consumption');
    },
  });
}
