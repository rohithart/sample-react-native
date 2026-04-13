import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface FormFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
}

export function FormField({ label, required, style, ...rest }: FormFieldProps) {
  const { text, sub, inputBg, inputBorder } = useThemeColors();

  return (
    <View style={{ gap: 8 }}>
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
    </View>
  );
}
