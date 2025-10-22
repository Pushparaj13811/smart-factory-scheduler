// User role definitions

export const UserRole = {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  INDUSTRY_OWNER: 'INDUSTRY_OWNER',
  ADMINISTRATOR: 'ADMINISTRATOR',
  SUPERVISOR: 'SUPERVISOR',
  WORKER: 'WORKER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SYSTEM_ADMIN]: 'System Administrator',
  [UserRole.INDUSTRY_OWNER]: 'Industry Owner',
  [UserRole.ADMINISTRATOR]: 'Administrator',
  [UserRole.SUPERVISOR]: 'Supervisor',
  [UserRole.WORKER]: 'Worker/Operator',
};

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SYSTEM_ADMIN]: 5,
  [UserRole.INDUSTRY_OWNER]: 4,
  [UserRole.ADMINISTRATOR]: 3,
  [UserRole.SUPERVISOR]: 2,
  [UserRole.WORKER]: 1,
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  [UserRole.SYSTEM_ADMIN]:
    'Platform administrator with access to all industries and system settings',
  [UserRole.INDUSTRY_OWNER]: 'Industry owner with full access to industry operations and settings',
  [UserRole.ADMINISTRATOR]:
    'Administrator with access to industry operations and employee management',
  [UserRole.SUPERVISOR]: 'Supervisor with access to team management and task oversight',
  [UserRole.WORKER]: 'Worker with access to personal tasks and schedule',
};
