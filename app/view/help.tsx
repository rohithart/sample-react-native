import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { getHelpData, type HelpItem } from '@/utils/help-data';
import { Stack, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  const colors = useThemeColors();
  const router = useRouter();
  const helpData = getHelpData('user');

  const renderHelpItem = (item: HelpItem, index: number) => (
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

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {helpData.map(renderHelpItem)}
      </ScrollView>
    </SafeAreaView>
  );
}
