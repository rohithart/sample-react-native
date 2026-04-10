import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';

import { useAuth } from '@/context/auth-context';

export default function ProtectedDashboard() {
  const { role, toggleRole, logout } = useAuth();

  return (
    <View className="flex-1 p-6">
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <Button onPress={() => logout()} variant="link" size="sm">
              <ButtonText>Logout</ButtonText>
            </Button>
          ),
        }}
      />

      <VStack className="gap-4 mt-4">
        <Box className="p-4 bg-background-0 rounded-lg border border-outline-100">
          <Text className="text-2xl font-bold mb-2 text-typography-900">
            Welcome{role === 'admin' ? ', Admin' : ''}!
          </Text>
          <Text className="text-typography-500 mb-4">
            This is a protected route. You can only see this because you&apos;re logged in.
          </Text>

          <VStack className="gap-2">
            <Text className="font-semibold text-typography-900">Role Controls:</Text>
            <HStack className="gap-2 items-center">
              <Text size="sm" className="text-typography-500">Current Role:</Text>
              <Text
                className={`font-bold ${role === 'admin' ? 'text-success-600' : 'text-typography-500'}`}>
                {role}
              </Text>
              <Button onPress={toggleRole} size="sm" variant="outline">
                <ButtonText>Toggle Role</ButtonText>
              </Button>
            </HStack>

            <Text size="sm" className="mt-2 text-typography-400">
              {role === 'admin'
                ? 'As admin, you can access /protected/admin settings.'
                : 'As a regular user, you can only access the dashboard. Toggle to admin to see nested protected routes.'}
            </Text>
          </VStack>
        </Box>

        <Box className="p-4 bg-background-0 rounded-lg border border-outline-100">
          <Text className="font-bold mb-2 text-typography-900">Role-Based Access Demo:</Text>
          <VStack className="gap-2">
            <HStack className="justify-between items-center">
              <Text size="sm" className="text-typography-500">Admin Settings:</Text>
              <Text
                size="sm"
                className={role === 'admin' ? 'text-success-600' : 'text-error-500'}>
                {role === 'admin' ? 'Accessible' : 'Restricted'}
              </Text>
            </HStack>
            <Text size="xs" className="text-typography-400">
              Navigate to Admin Settings to test role-based access
            </Text>
          </VStack>
        </Box>
      </VStack>
    </View>
  );
}
