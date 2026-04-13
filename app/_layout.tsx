import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { ErrorBoundary } from '@/components/error-boundary';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { AuthProvider } from '@/context/auth-context';
import { OrganisationProvider } from '@/context/organisation-context';
import { ThemeProvider, useTheme } from '@/context/theme-context';
import { ToastProvider } from '@/context/toast-context';

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { isDark } = useTheme();

  return (
    <ToastProvider isDark={isDark}>
      <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
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

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GluestackUIProvider mode="system">
            <AuthProvider>
              <OrganisationProvider>
                <RootLayoutContent />
              </OrganisationProvider>
            </AuthProvider>
          </GluestackUIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
