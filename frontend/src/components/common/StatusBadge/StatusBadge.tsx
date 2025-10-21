// Status badge component for displaying various statuses

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export type Status =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'completed'
  | 'failed'
  | 'running'
  | 'paused'
  | 'scheduled'
  | 'cancelled'
  | 'in_progress';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusConfig: Record<
  Status,
  { translationKey: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className?: string }
> = {
  active: { translationKey: 'status.active', variant: 'default', className: 'bg-green-600 hover:bg-green-700' },
  inactive: { translationKey: 'status.inactive', variant: 'secondary' },
  pending: { translationKey: 'status.pending', variant: 'outline', className: 'border-yellow-600 text-yellow-700' },
  completed: { translationKey: 'status.completed', variant: 'default', className: 'bg-blue-600 hover:bg-blue-700' },
  failed: { translationKey: 'status.failed', variant: 'destructive' },
  running: { translationKey: 'status.running', variant: 'default', className: 'bg-green-600 hover:bg-green-700' },
  paused: { translationKey: 'status.paused', variant: 'secondary' },
  scheduled: { translationKey: 'status.scheduled', variant: 'outline', className: 'border-blue-600 text-blue-700' },
  cancelled: { translationKey: 'status.cancelled', variant: 'secondary' },
  in_progress: { translationKey: 'status.inProgress', variant: 'default', className: 'bg-yellow-600 hover:bg-yellow-700' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const { t } = useTranslation('common');
  const config = statusConfig[status];
  const displayLabel = label || t(config.translationKey);

  return (
    <Badge variant={config.variant} className={cn(config.className)}>
      {displayLabel}
    </Badge>
  );
}
