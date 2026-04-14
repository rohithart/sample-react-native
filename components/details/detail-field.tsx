import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text, View } from 'react-native';

interface DetailFieldProps {
  label: string;
  value?: string | number | null;
}

export function DetailField({ label, value }: DetailFieldProps) {
  const { card, text, sub, border } = useThemeColors();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: card,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 13, color: sub, flex: 1 }}>{label}</Text>
      <Text
        style={{ fontSize: 13, fontWeight: '500', color: text, flex: 1.5, textAlign: 'right' }}
        numberOfLines={3}
      >
        {value != null && value !== '' ? String(value) : '—'}
      </Text>
    </View>
  );
}
