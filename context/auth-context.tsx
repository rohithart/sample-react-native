import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type Role = 'admin' | 'user';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  role: Role;
  login: (role: Role) => Promise<void>;
  logout: () => Promise<void>;
  toggleRole: () => void;
};

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';

// expo-secure-store is not available on web — fall back to no-op
const storage = {
  get: (key: string) =>
    Platform.OS !== 'web' ? SecureStore.getItemAsync(key) : Promise.resolve(null),
  set: (key: string, value: string) =>
    Platform.OS !== 'web' ? SecureStore.setItemAsync(key, value) : Promise.resolve(),
  remove: (key: string) =>
    Platform.OS !== 'web' ? SecureStore.deleteItemAsync(key) : Promise.resolve(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<Role>('user');

  // Hydrate auth state from secure storage on mount
  useEffect(() => {
    (async () => {
      try {
        const [token, savedRole] = await Promise.all([
          storage.get(TOKEN_KEY),
          storage.get(ROLE_KEY),
        ]);
        if (token) {
          setIsLoggedIn(true);
          setRole((savedRole as Role) ?? 'user');
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (newRole: Role) => {
    await Promise.all([
      storage.set(TOKEN_KEY, `mock_token_${Date.now()}`),
      storage.set(ROLE_KEY, newRole),
    ]);
    setIsLoggedIn(true);
    setRole(newRole);
  };

  const logout = async () => {
    await Promise.all([storage.remove(TOKEN_KEY), storage.remove(ROLE_KEY)]);
    setIsLoggedIn(false);
    setRole('user');
  };

  const toggleRole = () => setRole((prev) => (prev === 'admin' ? 'user' : 'admin'));

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, role, login, logout, toggleRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
