// Mock data for development and testing

import { UserRole } from '@/constants/roles';
import type { User } from '@/types/auth.types';

// Mock users database
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@system.com',
    name: 'System Administrator',
    role: UserRole.SYSTEM_ADMIN,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'owner@factory1.com',
    name: 'Factory Owner',
    role: UserRole.INDUSTRY_OWNER,
    industryId: 'industry-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'admin@factory1.com',
    name: 'Factory Admin',
    role: UserRole.ADMINISTRATOR,
    industryId: 'industry-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    email: 'supervisor@factory1.com',
    name: 'Production Supervisor',
    role: UserRole.SUPERVISOR,
    industryId: 'industry-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    email: 'worker@factory1.com',
    name: 'Machine Operator',
    role: UserRole.WORKER,
    industryId: 'industry-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock password (for all users in development)
export const MOCK_PASSWORD = 'password123';

// Mock industries
export const MOCK_INDUSTRIES = [
  {
    id: 'industry-1',
    name: 'ABC Manufacturing',
    status: 'active',
  },
  {
    id: 'industry-2',
    name: 'XYZ Industries',
    status: 'active',
  },
];

// Helper to generate mock token
export function generateMockToken(userId: string): string {
  return `mock-token-${userId}-${Date.now()}`;
}

// Helper to generate mock refresh token
export function generateMockRefreshToken(userId: string): string {
  return `mock-refresh-${userId}-${Date.now()}`;
}

// Helper to find user by email
export function findUserByEmail(email: string): User | undefined {
  return MOCK_USERS.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

// Helper to find user by id
export function findUserById(id: string): User | undefined {
  return MOCK_USERS.find((user) => user.id === id);
}

// Helper to validate credentials
export function validateCredentials(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (user && password === MOCK_PASSWORD) {
    return user;
  }
  return null;
}
