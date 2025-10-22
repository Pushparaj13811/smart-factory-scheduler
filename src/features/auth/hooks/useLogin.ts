// useLogin hook

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import type { LoginCredentials } from '@/types/auth.types';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token, data.refreshToken);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
}
