import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function WorkflowPreviewScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="workflow"
        title="Preview workflow"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>🚧</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Preview Workflow</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>ID ${id}</Text>
      </View>
    </SafeAreaView>
  );
}
