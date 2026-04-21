import { FormField } from '@/components/ui/form-field';
import { HStack } from '@/components/ui/hstack';
import { PageHeader } from '@/components/ui/page-header';
import { VStack } from '@/components/ui/vstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SupportScreen() {
  const { orgId } = useLocalSearchParams<{ orgId: string }>();
  const colors = useThemeColors();
  const { userRole } = useOrganisationContext();
  const userEmail = userRole?.user?.email || 'john@example.com';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="support"
        title="Support"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>👤</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Support</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>Coming soon</Text>
      </View>

      {/* this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    }); */}
    </SafeAreaView>
  );
}
