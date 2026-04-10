import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';

import { useAuth } from '@/context/auth-context';

export default function AdminSettings() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 p-6">
      <Stack.Screen options={{ title: 'Admin Settings' }} />

      <VStack className="gap-4 mt-4">
        <Box className="p-4 bg-warning-50 border-l-4 border-warning-500 rounded-lg">
          <Text className="text-xl font-bold text-warning-600 mb-2">Admin Access Only</Text>
          <Text className="text-typography-500">
            You have admin-level access to this section. Regular users are redirected away.
          </Text>
        </Box>

        <Box className="p-4 bg-background-0 rounded-lg border border-outline-100">
          <Text className="text-lg font-bold mb-3 text-typography-900">Admin Controls</Text>
          <VStack className="gap-3">
            <Button variant="outline" onPress={() => {}}>
              <ButtonText>User Management</ButtonText>
            </Button>
            <Button variant="outline" onPress={() => {}}>
              <ButtonText>System Settings</ButtonText>
            </Button>
            <Button variant="outline" onPress={() => {}}>
              <ButtonText>Audit Logs</ButtonText>
            </Button>
          </VStack>
        </Box>

        <Box className="p-4 bg-background-50 rounded-lg">
          <Text size="sm" className="text-typography-500">
            This screen is protected by both login AND admin role. Regular users cannot access this.
          </Text>
        </Box>

        <Button variant="outline" action="negative" onPress={() => logout()}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </VStack>
    </View>
  );
}
