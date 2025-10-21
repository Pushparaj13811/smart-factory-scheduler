// Auth service with mock implementation

import type {
  LoginCredentials,
  SignupData,
  AuthResponse,
  ForgotPasswordData,
  ResetPasswordData,
  User,
} from '@/types/auth.types';
import {
  validateCredentials,
  findUserByEmail,
  generateMockToken,
  generateMockRefreshToken,
  MOCK_USERS,
} from '@/lib/mock-data';
import { UserRole } from '@/constants/roles';

// Simulate network delay
const delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay();

    const user = validateCredentials(credentials.email, credentials.password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = generateMockToken(user.id);
    const refreshToken = generateMockRefreshToken(user.id);

    return {
      user,
      token,
      refreshToken,
    };
  },

  /**
   * Signup new user
   */
  signup: async (data: SignupData): Promise<AuthResponse> => {
    await delay();

    // Check if email already exists
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: UserRole.ADMINISTRATOR, // Default role for new signups
      industryId: data.industryId || `industry-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In real app, this would save to database
    MOCK_USERS.push(newUser);

    const token = generateMockToken(newUser.id);
    const refreshToken = generateMockRefreshToken(newUser.id);

    return {
      user: newUser,
      token,
      refreshToken,
    };
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await delay(300);
    // In real app, would invalidate token on server
    return;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    await delay(300);

    // Extract user ID from mock refresh token
    const parts = refreshToken.split('-');
    const userId = parts[2];

    if (!userId) {
      throw new Error('Invalid refresh token');
    }

    const newToken = generateMockToken(userId);
    const newRefreshToken = generateMockRefreshToken(userId);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  },

  /**
   * Forgot password - send reset email
   */
  forgotPassword: async (data: ForgotPasswordData): Promise<void> => {
    await delay();

    const user = findUserByEmail(data.email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return;
    }

    // In real app, would send email with reset token
    console.log(`Password reset email sent to ${data.email}`);
    return;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (_data: ResetPasswordData): Promise<void> => {
    await delay();

    // In real app, would verify token and update password
    console.log('Password reset successfully');
    return;
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<void> => {
    await delay();

    // In real app, would verify email token
    console.log('Email verified:', token);
    return;
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    await delay(300);

    // In real app, would fetch from API using token
    // For mock, get from localStorage auth state
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const { state } = JSON.parse(authData);
      if (state?.user) {
        return state.user;
      }
    }

    throw new Error('Not authenticated');
  },
};
