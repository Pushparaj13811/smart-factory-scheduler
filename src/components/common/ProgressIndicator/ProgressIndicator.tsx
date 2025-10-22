// Progress indicator component

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function ProgressIndicator({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'default',
}: ProgressIndicatorProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: '',
    success: '[&>div]:bg-green-600',
    warning: '[&>div]:bg-yellow-600',
    danger: '[&>div]:bg-red-600',
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && <span className="font-medium">{label}</span>}
          {showPercentage && <span className="text-muted-foreground">{percentage}%</span>}
        </div>
      )}
      <Progress
        value={percentage}
        className={cn(heightClasses[size], variantClasses[variant])}
      />
    </div>
  );
}
