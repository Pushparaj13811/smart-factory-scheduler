// useLogout hook

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearAuth();
      toast.success('Logged out successfully');
      navigate('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Logout failed');
    },
  });
}
