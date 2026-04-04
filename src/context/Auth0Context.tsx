import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuth } from '@hooks/index';
import { useAuthStore } from '@store/index';
import { User, UserRole } from '@types/index';

interface Auth0ContextType {
  isLoading: boolean;
  userInfo: any;
  isSigningin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined);

const auth0ClientId = process.env.AUTH0_CLIENT_ID || '';
const auth0Domain = process.env.AUTH0_DOMAIN || '';
const redirectUrl = AuthSession.makeRedirectUrl();

interface Auth0ProviderProps {
  children: ReactNode;
}

export function Auth0Provider({ children }: Auth0ProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isSigningin, setIsSigningin] = useState(false);
  const { setUser, setTokens, logout: storeLogout, setAuthenticated } = useAuthStore();

  const discovery = AuthSession.useAutoDiscovery(auth0Domain);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUrl,
      usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    handleResponse();
  }, [response]);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const token = await SecureStore.getItemAsync('auth0Token');
      if (token) {
        setUserInfo(JSON.parse(token));
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleResponse = async () => {
    if (response?.type === 'success') {
      const { access_token, id_token } = response.params;
      await exchangeCodeForToken(access_token, id_token);
    }
  };

  const exchangeCodeForToken = async (accessToken: string, idToken: string) => {
    try {
      setIsSigningin(true);
      // Decode JWT to get user info (simplified)
      const userPayload = JSON.parse(
        Buffer.from(idToken.split('.')[1], 'base64').toString('utf8')
      );

      const user: User = {
        id: userPayload.sub,
        email: userPayload.email,
        name: userPayload.name || userPayload.email,
        avatar: userPayload.picture,
        role: UserRole.USER,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await SecureStore.setItemAsync('auth0Token', JSON.stringify(user));
      await SecureStore.setItemAsync('access_token', accessToken);
      await SecureStore.setItemAsync('refresh_token', idToken);

      setUser(user);
      setTokens({ accessToken, refreshToken: idToken });
      setAuthenticated(true);
      setUserInfo(user);
    } catch (error) {
      console.error('Token exchange failed:', error);
    } finally {
      setIsSigningin(false);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync('access_token');
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  };

  const login = async () => {
    setIsSigningin(true);
    try {
      await promptAsync();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSigningin(false);
    }
  };

  const logout = async () => {
    try {
      setIsSigningin(true);
      await SecureStore.deleteItemAsync('auth0Token');
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');

      const logoutUrl = `https://${auth0Domain}/v2/logout?client_id=${auth0ClientId}&returnTo=${encodeURIComponent(redirectUrl)}`;
      await WebBrowser.openBrowserAsync(logoutUrl);

      storeLogout();
      setUserInfo(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsSigningin(false);
    }
  };

  return (
    <Auth0Context.Provider
      value={{
        isLoading,
        userInfo,
        isSigningin,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}

export function useAuth0() {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error('useAuth0 must be used within an Auth0Provider');
  }
  return context;
}
