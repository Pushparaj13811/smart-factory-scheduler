// useForgotPassword hook

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import type { ForgotPasswordData } from '@/types/auth.types';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => authService.forgotPassword(data),
    onSuccess: () => {
      toast.success('Password reset link sent to your email');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send reset link');
    },
  });
}
