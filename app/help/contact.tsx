import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { PageHeader } from '@/components/ui/page-header';
import { VStack } from '@/components/ui/vstack';
import { useOrganisationContext } from '@/context/organisation-context';
import { useSendContact } from '@/services/email';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export default function ContactHelpScreen() {
  const { orgId } = useLocalSearchParams<{ orgId: string }>();
  const { organisation } = useOrganisationContext();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
   const sendMutation = useSendContact(organisation?._id || orgId);

  const handleSubmit = async () => {

    if (!subject.trim() || !message.trim()) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
    setIsSubmitting(true);
    await sendMutation.mutateAsync({ subject, message, organisation: organisation?._id || orgId });
    setIsSubmitting(false);
    Alert.alert('Success', 'Your message has been sent!');
    setSubject('');
    setMessage('');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <PageHeader title="Contact Support" />
      <VStack space={16}>
        <FormField
          label="Organisation"
          value={organisation?.name || ''}
          editable={false}
          placeholder="Organisation"
        />
        <FormField
          label="Organisation ID"
          value={organisation?._id || ''}
          editable={false}
          placeholder="Organisation ID"
        />
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
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </VStack>
    </ScrollView>
  );
}
