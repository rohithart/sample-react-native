import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { AlertCircle } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 16 }}>
        <AlertCircle size={64} color={colors.sub} strokeWidth={1.5} />
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text }}>Page Not Found</Text>
        <Text style={{ fontSize: 15, color: colors.sub, textAlign: 'center', lineHeight: 22 }}>
          The page you're looking for doesn't exist or the URL may be incorrect.
        </Text>
        <Pressable
          onPress={() => router.replace('/home')}
          style={{
            marginTop: 8,
            backgroundColor: colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>Go to Organisations</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
