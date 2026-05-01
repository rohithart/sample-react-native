import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from '@/context/toast-context';

import { ScrollView } from '@/components/ui/scroll-view';
import { SubmitButton } from '@/components/ui/submit-button';

export default function AddAssetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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
    showToast({ type: 'success', title: 'Asset created successfully' });
    router.push(`/admin/assets/${id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="asset" title="Add New Asset" />

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
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

        <SubmitButton onPress={handleSubmit} isSubmitting={isSubmitting} label="Create Asset" />
      </ScrollView>
    </SafeAreaView>
  );
}
