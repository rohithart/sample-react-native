import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center gap-4 p-6">
        <Text className="text-6xl font-bold text-typography-200">404</Text>
        <Text className="text-xl font-bold text-typography-900">Page not found</Text>
        <Text size="sm" className="text-typography-500 text-center">
          This screen doesn&apos;t exist.
        </Text>
        <Link href="/" asChild>
          <Button variant="outline" size="md">
            <ButtonText>Go to home</ButtonText>
          </Button>
        </Link>
      </View>
    </>
  );
}
