import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAdminHelp } from '@/services/status';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from '@/components/ui/scroll-view';

export default function AdminHelpScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const {data: helpData} = useAdminHelp(id || '');

  const renderHelpItem = (item: any, index: number) => (
    <View key={index} style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 }}>
        {item.heading}
      </Text>
      <Text style={{ fontSize: 14, color: colors.sub, lineHeight: 20 }}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="help" title="Help" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 16 }}>
        {helpData?.data?.map((item: any) => renderHelpItem(item, item.heading))}
      </ScrollView>
    </SafeAreaView>
  );
}
