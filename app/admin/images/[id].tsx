import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllImagesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="gallery"
        title="Images"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>📷</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Images</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
