// React Query hook for machine maintenance history

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { machineService } from '../services/machine.service';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export function useMaintenanceHistory(machineId: string | undefined) {
  return useQuery({
    queryKey: ['maintenance-history', machineId],
    queryFn: () => machineService.getMaintenanceHistory(machineId!),
    enabled: !!machineId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useScheduleMaintenance() {
  const queryClient = useQueryClient();
  const { t } = useTranslation('machines');

  return useMutation({
    mutationFn: ({
      machineId,
      data,
    }: {
      machineId: string;
      data: { type: string; scheduledDate: string; description: string };
    }) => machineService.scheduleMaintenance(machineId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['maintenance-history', variables.machineId],
      });
      queryClient.invalidateQueries({ queryKey: ['machine', variables.machineId] });
      toast.success(t('maintenance.scheduleMaintenance') + ' ' + t('states.success', { ns: 'common' }));
    },
    onError: () => {
      toast.error(t('states.error', { ns: 'common' }));
    },
  });
}
