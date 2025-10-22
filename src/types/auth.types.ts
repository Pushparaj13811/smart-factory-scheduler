// Authentication types

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  industryId?: string; // null for SYSTEM_ADMIN
  supervisorId?: string; // For workers/operators who report to a supervisor
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  industryId?: string; // If joining existing industry
  industryName?: string; // If creating new industry
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}
