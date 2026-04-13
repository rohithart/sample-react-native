import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { FormField } from '@/components/ui/form-field';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, Pressable, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  const { id, qId } = useLocalSearchParams<{ id: string; qId: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    Alert.alert('Success', 'New Vote created successfully', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="New Vote" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 }}>
          <Text style={{ fontSize: 12, color: colors.sub }}>Context: Quote: ${qId}</Text>
        </View>

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
            {isSubmitting ? 'Creating...' : 'Create'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
