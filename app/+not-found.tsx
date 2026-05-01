import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter, usePathname } from 'expo-router';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

export default function NotFoundScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenInBrowser = () => {
    const webUrl = `https://app.darthvader.com/${pathname}`;
    Linking.openURL(webUrl);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 16 }}>
        <I.alertCircle size={64} color={colors.sub} strokeWidth={1.5} />
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text }}>Page Not Found</Text>
        <Text style={{ fontSize: 15, color: colors.sub, textAlign: 'center', lineHeight: 22 }}>
          The page you&apos;re looking for doesn&apos;t exist or may only be available on the web.
        </Text>

        <View style={{ gap: 12, width: '100%', alignItems: 'center', marginTop: 8 }}>
          <Pressable
            onPress={() => router.replace('/home')}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 10,
              width: '100%',
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 15, fontWeight: '600'}}>
              Go to Organisations
            </Text>
          </Pressable>

          <Pressable onPress={handleOpenInBrowser} style={{ paddingVertical: 8 }}>
            <Text style={{ color: colors.secondary, fontSize: 15, fontWeight: '500' }}>
              Try opening in browser
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
