import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { PageHeader } from '@/components/ui/page-header';
import { VStack } from '@/components/ui/vstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useSendReport } from '@/services/email';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReportScreen() {
  const { orgId } = useLocalSearchParams<{ orgId: string }>();
  const { organisation } = useOrganisationContext();
  const colors = useThemeColors();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
   const sendMutation = useSendReport(organisation?._id || orgId);
   const { showToast } = useToast();

  const handleSubmit = async () => {

    if (!subject.trim() || !message.trim()) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Please fill all required fields' });
      return;
    }
    setIsSubmitting(true);
    await sendMutation.mutateAsync({ subject, message, organisation: organisation?._id || orgId, organisationName: organisation?.name || 'Unknown' } as any);
    setIsSubmitting(false);
    showToast({ type: 'success', title: 'Success', message: 'Your message has been sent to admin!' });
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="zap"
        title="Report an issue to admin"
      />
      <ScrollView 
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space="md">
          <FormField
            label="Subject"
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter subject"
            required
          />
          <FormField
            label="Message"
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message"
            multiline
            numberOfLines={5}
            required
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
          <Button onPress={handleSubmit} disabled={isSubmitting || !subject.trim() || !message.trim()}>
            <Text>{isSubmitting ? 'Sending...' : 'Report'}</Text>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
