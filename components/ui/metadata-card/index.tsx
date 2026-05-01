import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';

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
    <VStack
      space="sm"
      style={{
        backgroundColor: card,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 8,
        padding: 12,
      }}
    >
      {rows.map((row, idx) => (
        <HStack key={idx} className="justify-between">
          <Text style={{ color: sub, fontSize: 13 }}>{row.label}</Text>
          <Text style={{ color: text, fontSize: 13, fontWeight: '500' }}>{row.value}</Text>
        </HStack>
      ))}
    </VStack>
  );
}
