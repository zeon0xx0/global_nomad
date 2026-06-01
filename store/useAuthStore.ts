import { create } from 'zustand';
import type { GetMyInfoSuccessResponse as User } from '@/types/domain/user/types';

interface AuthStore {
  user: User | null | undefined; // undefined = 초기화 전
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: undefined,

  setUser: user => set({ user }),

  clearUser: () => set({ user: null }),
}));
