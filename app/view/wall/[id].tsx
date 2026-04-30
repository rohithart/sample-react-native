import { PageHeader } from '@/components/ui/page-header';
import WallPage from '@/components/wall/wall';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WallScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="wall"
        title="Wall"
      />

      <WallPage />
    </SafeAreaView>
  );
}
