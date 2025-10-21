// User management types

import type { User } from '@/types/auth.types';
import type { UserRole } from '@/constants/roles';

// Re-export User type from auth
export type { User } from '@/types/auth.types';

// User status
export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

// User filters
export interface UserFilters {
  search?: string;
  role?: UserRole[];
  status?: UserStatus[];
  industryId?: string;
}

// Users response
export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

// User form data
export interface UserFormData {
  email: string;
  name: string;
  role: UserRole;
  industryId?: string;
  password?: string;
  avatar?: string;
  status?: UserStatus;
}

// User update data
export interface UserUpdateData extends Partial<UserFormData> {
  id: string;
}

// User stats
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  byRole: {
    role: UserRole;
    count: number;
  }[];
  recentlyAdded: number;
}

// Extended user with additional fields
export interface ExtendedUser extends User {
  status: UserStatus;
  lastActive?: Date;
  phoneNumber?: string;
  department?: string;
}
