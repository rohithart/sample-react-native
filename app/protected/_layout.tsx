import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { useColorScheme } from 'nativewind';

import { useAuth } from '@/context/auth-context';

export default function ProtectedLayout() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Checking authentication...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
        },
        headerTintColor: isDark ? '#fefeff' : '#171717',
        headerBackVisible: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Protected Dashboard',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="admin"
        options={{
          title: 'Admin Settings',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
