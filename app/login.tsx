import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';

import { useAuth } from '@/context/auth-context';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (role: 'admin' | 'user') => {
    await login(role);
    router.replace('/protected');
  };

  return (
    <View className="flex-1 p-6 justify-center">
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />

      <VStack className="gap-4">
        <Box className="p-6 bg-background-100 rounded-lg">
          <Text className="text-2xl font-bold mb-2 text-center">
            Authentication Required
          </Text>
          <Text className="text-base text-center text-typography-500 mb-6">
            Select a role to simulate login and access protected routes
          </Text>

          <VStack className="gap-3">
            <Button
              variant="outline"
              onPress={() => handleLogin('user')}
              className="border-primary-500">
              <HStack className="flex-1 justify-between items-center">
                <ButtonText className="font-semibold">Regular User</ButtonText>
                <Text className="text-sm text-typography-500">Dashboard only</Text>
              </HStack>
            </Button>

            <Button
              variant="solid"
              onPress={() => handleLogin('admin')}
              className="bg-warning-500">
              <HStack className="flex-1 justify-between items-center">
                <ButtonText className="font-semibold">Admin User</ButtonText>
                <Text className="text-sm text-white/70">
                  Dashboard + Admin Settings
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Box>

        <Box className="p-4 bg-background-100 rounded-lg">
          <Text className="font-semibold mb-2">How This Works:</Text>
          <VStack className="gap-2">
            <Text className="text-sm text-typography-500">• Login simulates authentication state</Text>
            <Text className="text-sm text-typography-500">• Role determines access level</Text>
            <Text className="text-sm text-typography-500">• Toggle role to see redirect behavior</Text>
          </VStack>
        </Box>
      </VStack>
    </View>
  );
}
