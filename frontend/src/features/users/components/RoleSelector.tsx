// Role Selector component

import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS } from '@/constants/roles';
import { Badge } from '@/components/ui/badge';

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  excludeRoles?: UserRole[];
}

export function RoleSelector({
  value,
  onChange,
  label,
  disabled = false,
  error,
  excludeRoles = [],
}: RoleSelectorProps) {
  const { t } = useTranslation('users');

  const availableRoles = Object.values(UserRole).filter(
    (role) => !excludeRoles.includes(role)
  );

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={error ? 'border-destructive' : ''}>
          <SelectValue placeholder={t('form.selectRole')} />
        </SelectTrigger>
        <SelectContent>
          {availableRoles.map((role) => (
            <SelectItem key={role} value={role}>
              <div className="flex items-center gap-2">
                <span>{ROLE_LABELS[role]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && !error && (
        <p className="text-sm text-muted-foreground">{ROLE_DESCRIPTIONS[value as UserRole]}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
