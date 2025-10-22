// React Query mutations for machine CRUD operations

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { machineService } from '../services/machine.service';
import type { CreateMachineInput, UpdateMachineInput, MachineStatus } from '../types';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function useCreateMachine() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('machines');

  return useMutation({
    mutationFn: (data: CreateMachineInput) => machineService.createMachine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['machines'] });
      queryClient.invalidateQueries({ queryKey: ['machine-stats'] });
      toast.success(t('messages.createSuccess'));
    },
    onError: () => {
      toast.error(t('messages.createError'));
    },
  });
}

export function useUpdateMachine() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('machines');

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMachineInput }) =>
      machineService.updateMachine(id, data),
    onSuccess: (_data: unknown, variables: { id: string; data: UpdateMachineInput }) => {
      queryClient.invalidateQueries({ queryKey: ['machines'] });
      queryClient.invalidateQueries({ queryKey: ['machine', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['machine-stats'] });
      toast.success(t('messages.updateSuccess'));
    },
    onError: () => {
      toast.error(t('messages.updateError'));
    },
  });
}

export function useDeleteMachine() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('machines');

  return useMutation({
    mutationFn: (id: string) => machineService.deleteMachine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['machines'] });
      queryClient.invalidateQueries({ queryKey: ['machine-stats'] });
      toast.success(t('messages.deleteSuccess'));
    },
    onError: () => {
      toast.error(t('messages.deleteError'));
    },
  });
}

export function useUpdateMachineStatus() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('machines');

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: MachineStatus }) =>
      machineService.updateMachineStatus(id, status),
    onSuccess: (_data: unknown, variables: { id: string; status: MachineStatus }) => {
      queryClient.invalidateQueries({ queryKey: ['machines'] });
      queryClient.invalidateQueries({ queryKey: ['machine', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['machine-stats'] });
      toast.success(t('messages.statusUpdateSuccess'));
    },
    onError: () => {
      toast.error(t('messages.updateError'));
    },
  });
}
