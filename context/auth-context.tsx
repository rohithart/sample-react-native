import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';

const AUTH0_DOMAIN = process.env.EXPO_PUBLIC_AUTH0_DOMAIN ?? '';
const AUTH0_CLIENT_ID = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID ?? '';
const AUTH0_AUDIENCE = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE ?? '';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderInner({ children }: { children: ReactNode }) {
  const { user, isLoading: auth0Loading, authorize, clearSession, getCredentials } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);

  useEffect(() => {
    if (auth0Loading) return;
    if (user) {
      getCredentials()
        .then((creds) => setAccessToken(creds?.accessToken ?? null))
        .catch(() => setAccessToken(null))
        .finally(() => setTokenLoading(false));
    } else {
      setAccessToken(null);
      setTokenLoading(false);
    }
  }, [user, auth0Loading, getCredentials]);

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  const login = useCallback(async () => {
    try {
      await authorize({ audience: AUTH0_AUDIENCE, scope: 'openid profile email offline_access' });
      const creds = await getCredentials();
      setAccessToken(creds?.accessToken ?? null);
    } catch {
      // User cancelled or auth failed
    }
  }, [authorize, getCredentials]);

  const logoutFn = useCallback(async () => {
    try {
      await clearSession();
    } catch {
      // Logout failed
    } finally {
      setAccessToken(null);
    }
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isLoading: auth0Loading || tokenLoading,
        user: user ?? null,
        accessToken,
        login,
        logout: logoutFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <AuthProviderInner>{children}</AuthProviderInner>
    </Auth0Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
