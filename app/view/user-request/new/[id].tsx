import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from '@/components/ui/vstack';
import { Wysiwyg } from '@/components/wysiwyg';
import { useCreateUserRequest } from '@/services/user-request';
import { ENTITY_ICONS } from '@/constants/entity-icons';

export default function AddRequestScreen() {
  const { id: orgId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createRequest= useCreateUserRequest(orgId ?? '');
  const I = ENTITY_ICONS;

  const isFormValid =
    !!title.trim() &&
    !!description.trim();

  const handleSubmit = async () => {
      if (!title.trim() || !description.trim() ) {
        Alert.alert('Validation Error', 'Please fill all required fields');
        return;
      }
      setIsSubmitting(true);
      try {
        await createRequest.mutateAsync({
          title: title.trim(),
          description: description.trim(),
          organisation: orgId as unknown as any,
        });
        setIsSubmitting(false);
        Alert.alert('Success', 'Request created successfully', [
          { text: 'OK', onPress: () => router.push(`/view/user-requests/${orgId}`) },
        ]);
      } catch (e: any) {
        setIsSubmitting(false);
        Alert.alert('Error', e?.message || 'Failed to create request');
      }
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="userRequest" title="Add New Request" 
      rightAction={
        <Pressable onPress={handleSubmit} style={{ padding: 8 }} disabled={!isFormValid || isSubmitting}>
          <I.save size={20} color={colors.primary} />
        </Pressable>
      }/>

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Title"
          required
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        <VStack space="md" className="flex-1">
          <Text style={{ fontWeight: '600', color: colors.text }}>Description *</Text>
          <Wysiwyg
            value={description}
            onChange={setDescription}
            placeholder="Enter description..."
          />
        </VStack>
        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            opacity: pressed || isSubmitting ? 0.7 : 1,
            marginTop: 8,
          })}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
            {isSubmitting ? 'Creating...' : 'Create Request'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
