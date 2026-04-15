import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export function FormField({ label, required, style, ...rest }: FormFieldProps) {
  const { text, sub, inputBg, inputBorder } = useThemeColors();

  return (
    <VStack space="sm">
      <Text style={{ fontSize: 14, fontWeight: '600', color: text }}>
        {label}{required ? ' *' : ''}
      </Text>
      <TextInput
        placeholderTextColor={sub}
        style={[
          {
            backgroundColor: inputBg,
            borderWidth: 1,
            borderColor: inputBorder,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            color: text,
            fontSize: 14,
          },
          rest.multiline ? { textAlignVertical: 'top' as const } : undefined,
          style,
        ]}
        {...rest}
      />
    </VStack>
  );
}
