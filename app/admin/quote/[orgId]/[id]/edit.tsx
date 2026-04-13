import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, Pressable, Alert } from 'react-native';

export default function EditQuoteScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [name, setName] = useState('Sample Quote');
  const [description, setDescription] = useState('This is a sample quote description.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    Alert.alert('Success', 'Quote updated successfully', [
      { text: 'OK', onPress: () => router.push(`/admin/quote/${orgId}/${id}`) },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Quote',
      'This action cannot be reversed. The quote will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 500));
            setIsSubmitting(false);
            router.push(`/admin/quotes/${orgId}`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Edit Quote" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          disabled={isSubmitting}
          style={({ pressed }) => ({
            backgroundColor: colors.danger + '20',
            borderWidth: 1,
            borderColor: colors.danger,
            paddingVertical: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            opacity: pressed || isSubmitting ? 0.7 : 1,
          })}
        >
          <Trash2 size={18} color={colors.danger} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.danger }}>
            Delete Quote
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
