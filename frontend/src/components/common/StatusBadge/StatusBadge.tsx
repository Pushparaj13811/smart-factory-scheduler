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
  | 'idle'
  | 'maintenance'
  | 'offline'
  | 'error'
  | 'setup'
  | 'paused'
  | 'scheduled'
  | 'cancelled'
  | 'in_progress';

interface StatusBadgeProps {
  status: string;
  label?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface StatusConfig {
  translationKey: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

const statusConfig: Record<string, StatusConfig> = {
  active: { translationKey: 'status.active', variant: 'default', className: 'bg-green-600 hover:bg-green-700' },
  inactive: { translationKey: 'status.inactive', variant: 'secondary' },
  pending: { translationKey: 'status.pending', variant: 'outline', className: 'border-yellow-600 text-yellow-700' },
  completed: { translationKey: 'status.completed', variant: 'default', className: 'bg-blue-600 hover:bg-blue-700' },
  failed: { translationKey: 'status.failed', variant: 'destructive' },
  running: { translationKey: 'status.running', variant: 'default', className: 'bg-green-600 hover:bg-green-700' },
  idle: { translationKey: 'status.idle', variant: 'secondary' },
  maintenance: { translationKey: 'status.maintenance', variant: 'outline', className: 'border-orange-600 text-orange-700' },
  offline: { translationKey: 'status.offline', variant: 'destructive' },
  error: { translationKey: 'status.error', variant: 'destructive' },
  setup: { translationKey: 'status.setup', variant: 'outline', className: 'border-blue-600 text-blue-700' },
  paused: { translationKey: 'status.paused', variant: 'secondary' },
  scheduled: { translationKey: 'status.scheduled', variant: 'outline', className: 'border-blue-600 text-blue-700' },
  cancelled: { translationKey: 'status.cancelled', variant: 'secondary' },
  in_progress: { translationKey: 'status.inProgress', variant: 'default', className: 'bg-yellow-600 hover:bg-yellow-700' },
};

const defaultConfig: StatusConfig = {
  translationKey: 'status.unknown',
  variant: 'secondary',
};

export function StatusBadge({ status, label, variant }: StatusBadgeProps) {
  const { t } = useTranslation('common');

  // Get config, fallback to default if status not found
  const config = statusConfig[status] || defaultConfig;

  // Use provided variant or config variant
  const badgeVariant = variant || config.variant;

  // Use provided label or translate
  const displayLabel = label || t(config.translationKey, { defaultValue: status });

  return (
    <Badge variant={badgeVariant} className={cn(config.className)}>
      {displayLabel}
    </Badge>
  );
}
