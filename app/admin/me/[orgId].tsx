import { useThemeColors } from '@/hooks/use-theme-colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MySpaceScreen() {
  const { orgId } = useLocalSearchParams<{ orgId: string }>();
  const colors = useThemeColors();
  const router = useRouter();


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <Text style={{ fontSize: 24, color: colors.text }}>‹</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>My Profile</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>👤</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>My Profile</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
