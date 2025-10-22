// Component React Query hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { componentService } from '../services/component.service';
import { toast } from 'sonner';
import type { ComponentFilters, ComponentFormData } from '../types';

// Query hooks
export function useComponents(page = 1, pageSize = 10, filters?: ComponentFilters) {
  return useQuery({
    queryKey: ['components', page, pageSize, filters],
    queryFn: () => componentService.getComponents(page, pageSize, filters),
  });
}

export function useComponent(id: string) {
  return useQuery({
    queryKey: ['component', id],
    queryFn: () => componentService.getComponent(id),
    enabled: !!id,
  });
}

// Mutation hooks
export function useCreateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ComponentFormData) => componentService.createComponent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      toast.success('Component created successfully');
    },
    onError: () => {
      toast.error('Failed to create component');
    },
  });
}

export function useUpdateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ComponentFormData> }) =>
      componentService.updateComponent(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      queryClient.invalidateQueries({ queryKey: ['component', variables.id] });
      toast.success('Component updated successfully');
    },
    onError: () => {
      toast.error('Failed to update component');
    },
  });
}

export function useDeleteComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => componentService.deleteComponent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      toast.success('Component deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete component');
    },
  });
}

export function useAdjustStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity, reason }: { id: string; quantity: number; reason: string }) =>
      componentService.adjustStock(id, quantity, reason),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
      queryClient.invalidateQueries({ queryKey: ['component', variables.id] });
      toast.success('Stock adjusted successfully');
    },
    onError: () => {
      toast.error('Failed to adjust stock');
    },
  });
}
