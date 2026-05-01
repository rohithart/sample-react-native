import { LoadingPage } from '@/components/skeleton';
import { TERMS_AND_CONDITIONS_KEY } from '@/constants/memory';
import { useAuth } from '@/context/auth-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { isLoggedIn, isLoading, login, accessToken } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams<{ redirect?: string }>();
  const colors = useThemeColors();

  useEffect(() => {
    if (isLoading) return;

    if (isLoggedIn && accessToken) {
      const destination = params.redirect || '/home';
      router.replace(destination as any);
      return;
    }

    AsyncStorage.getItem(TERMS_AND_CONDITIONS_KEY).then((value) => {
      if (value !== 'true') {
        router.replace('/terms-and-conditions');
        return;
      }
      login();
    });
  }, [isLoading, isLoggedIn, accessToken, login, router, params.redirect]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <LoadingPage />
    </SafeAreaView>
  );
}
