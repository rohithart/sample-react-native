import { HStack } from '@/components/ui/hstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text } from '@/components/ui/text';

interface DetailFieldProps {
  label: string;
  value?: string | number | null;
}

export function DetailField({ label, value }: DetailFieldProps) {
  const { card, text, sub, border } = useThemeColors();

  return (
    <HStack
      className="justify-between items-start"
      style={{
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
    </HStack>
  );
}
