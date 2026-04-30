import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '@/components/ui/page-header';

export default function EditReminderScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="reminder"
        title="Edit reminder"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>🚧</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Edit Reminder</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>ID ${id}</Text>
      </View>
    </SafeAreaView>
  );
}
