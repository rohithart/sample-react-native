import { useThemeColors } from '@/hooks/use-theme-colors';
import { getHelpData, type HelpItem } from '@/utils/help-data';
import { useRouter } from 'expo-router';
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
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>‹</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>Help & Support</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {helpData.map(renderHelpItem)}
      </ScrollView>
    </SafeAreaView>
  );
}
