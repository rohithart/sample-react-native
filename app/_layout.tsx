import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { ErrorBoundary } from '@/components/error-boundary';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/context/auth-context';
import { DisplaySettingsProvider } from '@/context/display-settings-context';
import { OrganisationProvider } from '@/context/organisation-context';
import { ThemeProvider, useTheme } from '@/context/theme-context';
import { ToastProvider } from '@/context/toast-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useNotificationListener } from '@/hooks/use-notification-listener';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
  sendDefaultPii: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function RootLayoutContent() {
  const { isDark } = useTheme();
  useNotificationListener();

  return (
    <ToastProvider isDark={isDark}>
      <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="terms-and-conditions" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen name="view" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </NavThemeProvider>
    </ToastProvider>
  );
}

export default Sentry.wrap(function RootLayout() {
  return (
    <ErrorBoundary>
      <KeyboardProvider>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
          <ThemeProvider>
            <GluestackUIProvider mode="system">
              <AuthProvider>
                <OrganisationProvider>
                  <DisplaySettingsProvider>
                  <RootLayoutContent />
                  </DisplaySettingsProvider>
                </OrganisationProvider>
              </AuthProvider>
            </GluestackUIProvider>
          </ThemeProvider>
        </PersistQueryClientProvider>
      </KeyboardProvider>
    </ErrorBoundary>
  );
});
