import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateOrganisation } from '@/services/organisations';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';

export function AddOrganisation({ onSuccess }: { onSuccess?: () => void }) {
  const colors = useThemeColors();
  const { mutate: createOrg, isPending } = useCreateOrganisation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.inputBg,
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter an organisation name.');
      return;
    }
    createOrg(
      { name: name.trim(), description: description.trim() },
      {
        onSuccess: () => {
          setName('');
          setDescription('');
          Alert.alert('Success', 'Organisation created successfully.');
          onSuccess?.();
        },
        onError: () => {
          Alert.alert('Error', 'Failed to create organisation. Please try again.');
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, gap: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 6 }}>
          <Text className="text-sm font-medium">
            Organisation Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            style={inputStyle}
            placeholder="e.g. Acme Corp"
            placeholderTextColor={colors.sub}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>

        <View style={{ gap: 6 }}>
          <Text className="text-sm font-medium">Description</Text>
          <TextInput
            style={[inputStyle, { height: 100, textAlignVertical: 'top' }]}
            placeholder="What does this organisation do?"
            placeholderTextColor={colors.sub}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <Button
          className="w-full bg-primary-700 mt-2"
          onPress={handleSubmit}
          disabled={isPending}
        >
          <ButtonText className="text-white font-semibold">
            {isPending ? 'Creating…' : 'Create Organisation'}
          </ButtonText>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
