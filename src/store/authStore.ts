import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState, UserRole } from '@types/index';

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setAuthenticated: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTokens: (tokens: { accessToken: string | null; refreshToken: string | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      tokens: {
        accessToken: null,
        refreshToken: null,
      },

      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setTokens: (tokens) => set({ tokens }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          tokens: { accessToken: null, refreshToken: null },
        }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
