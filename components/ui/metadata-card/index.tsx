import React from 'react';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface MetadataRow {
  label: string;
  value: string;
}

interface MetadataCardProps {
  rows: MetadataRow[];
}

export function MetadataCard({ rows }: MetadataCardProps) {
  const { card, text, sub, border } = useThemeColors();

  return (
    <View
      style={{
        backgroundColor: card,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 8,
        padding: 12,
        gap: 8,
      }}
    >
      {rows.map((row, idx) => (
        <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: sub, fontSize: 13 }}>{row.label}</Text>
          <Text style={{ color: text, fontSize: 13, fontWeight: '500' }}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}
