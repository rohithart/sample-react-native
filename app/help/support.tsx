import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { PageHeader } from '@/components/ui/page-header';
import { VStack } from '@/components/ui/vstack';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useSendFeedback } from '@/services/email';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from '@/components/ui/scroll-view';

export default function ContactScreen() {
  const colors = useThemeColors();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
   const sendMutation = useSendFeedback();
   const { showToast } = useToast();

  const handleSubmit = async () => {

    if (!subject.trim() || !message.trim() || !name.trim() || !email.trim()) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Please fill all required fields' });
      return;
    }

    if(email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Please enter a valid email address' } );
      return;
    }
    setIsSubmitting(true);
    await sendMutation.mutateAsync({ subject, message, name, email } as any);
    setIsSubmitting(false);
    showToast({ type: 'success', title: 'Success', message: 'Your message has been sent to DarthVader!' });
    setSubject('');
    setMessage('');
    setName('');
    setEmail('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="support"
        title="Support"
      />
      <ScrollView 
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space="md">
          <FormField
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            required
          />
          <FormField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            required
            keyboardType="email-address"
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
          <Button onPress={handleSubmit} disabled={isSubmitting || !subject.trim() || !message.trim() || !name.trim() || !email.trim()}>
            <Text>{isSubmitting ? 'Sending...' : 'Send message'}</Text>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
