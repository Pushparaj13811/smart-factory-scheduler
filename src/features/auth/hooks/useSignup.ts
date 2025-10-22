// useSignup hook

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import type { SignupData } from '@/types/auth.types';

export function useSignup() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
    onSuccess: (data) => {
      setAuth(data.user, data.token, data.refreshToken);
      toast.success('Account created successfully!');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Signup failed');
    },
  });
}
