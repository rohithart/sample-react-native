import { useCallback } from 'react';
import { useAuthStore } from '@store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '@types/index';

export function useAuth() {
  const { user, isAuthenticated, isLoading, error, setUser, setAuthenticated, setLoading, setError, setTokens, logout } =
    useAuthStore();

  const login = useCallback(
    async (accessToken: string, refreshToken: string, userData: User) => {
      setLoading(true);
      try {
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('refresh_token', refreshToken);
        setTokens({ accessToken, refreshToken });
        setUser(userData);
        setAuthenticated(true);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [setUser, setAuthenticated, setLoading, setError, setTokens]
  );

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      setTokens({ accessToken: null, refreshToken: null });
      logout();
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      console.error('Logout error:', errorMessage);
    }
  }, [setTokens, logout, setError]);

  const hasRole = useCallback(
    (requiredRoles: UserRole[]): boolean => {
      return !!user && requiredRoles.includes(user.role);
    },
    [user]
  );

  const isAdmin = useCallback(() => {
    return user?.role === UserRole.ADMIN;
  }, [user]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: handleLogout,
    hasRole,
    isAdmin,
  };
}
