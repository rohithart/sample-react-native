import { FormField } from '@/components/ui/form-field';
import { PageHeader } from '@/components/ui/page-header';
import { ScrollView } from '@/components/ui/scroll-view';
import { SubmitButton } from '@/components/ui/submit-button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import type { EntityIconKey } from '@/constants/entity-icons';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FormScreenProps {
  icon: EntityIconKey;
  title: string;
  submitLabel: string;
  submittingLabel?: string;
  successMessage: string;
  /** Route to navigate to on success. Receives the search params. If not set, calls router.back(). */
  getRedirectRoute?: (params: Record<string, string>) => string;
  /** Pre-fill values for edit mode. */
  initialName?: string;
  initialDescription?: string;
  /** Extra context info to display (e.g. "Context: Event Type: 123") */
  contextInfo?: string;
}

export function FormScreen({
  icon,
  title,
  submitLabel,
  submittingLabel,
  successMessage,
  getRedirectRoute,
  initialName = '',
  initialDescription = '',
  contextInfo,
}: FormScreenProps) {
  const params = useLocalSearchParams();
  const router = useRouter();
  const colors = useThemeColors();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async () => {
    if (!name.trim()) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Please enter a name' });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    showToast({ type: 'success', title: successMessage });

    if (getRedirectRoute) {
      router.push(getRedirectRoute(params as Record<string, string>) as any);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon={icon} title={title} />

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {contextInfo && (
          <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 }}>
            <Text style={{ fontSize: 12, color: colors.sub }}>{contextInfo}</Text>
          </View>
        )}

        <FormField
          label="Name"
          required
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <FormField
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <SubmitButton
          onPress={handleSubmit}
          isSubmitting={isSubmitting}
          label={submitLabel}
          submittingLabel={submittingLabel}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
