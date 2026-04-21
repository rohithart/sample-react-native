import { FormField } from '@/components/ui/form-field';
import { HStack } from '@/components/ui/hstack';
import { PageHeader } from '@/components/ui/page-header';
import { VStack } from '@/components/ui/vstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSendContact } from '@/services/email';

export default function ContactScreen() {
  const { orgId } = useLocalSearchParams<{ orgId: string }>();
  const colors = useThemeColors();
  const { organisation } = useOrganisationContext();
  const sendMutation = useSendContact(organisation?._id || orgId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="mail"
        title="Contact organisation admin"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 48 }}>👤</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Contact organisation admin</Text>
        <Text style={{ fontSize: 14, color: colors.sub }}>Coming soon</Text>
      </View>
      
       { /* this.form = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      organisation: ['', Validators.required],
      organisationName: ['', Validators.required]
    });
    */}
    </SafeAreaView>
  );
}
