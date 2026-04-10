import { Stack, useRouter, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';

import { useAuth } from '@/context/auth-context';

export default function AdminLayout() {
  const { isLoggedIn, isLoading, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      router.replace('/login');
    } else if (role !== 'admin') {
      router.replace('/protected');
    }
  }, [isLoggedIn, isLoading, role, router, pathname]);

  if (isLoading || !isLoggedIn || role !== 'admin') {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Verifying admin access...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#7c3aed' },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="settings" options={{ title: 'Admin Settings' }} />
    </Stack>
  );
}
