import { HStack } from '@/components/ui/hstack';
import { StatusBadge } from '@/components/ui/status-badge';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Pressable, Text } from 'react-native';

interface ListItemCardProps {
  title: string;
  description?: string;
  status?: string;
  onPress: () => void;
}

export function ListItemCard({ title, description, status, onPress }: ListItemCardProps) {
  const { card, text, sub, border } = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 12,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: card,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border,
      }}
    >
      <VStack space="xs">
        <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>{title}</Text>
        {description ? (
          <Text style={{ fontSize: 13, color: sub }}>{description}</Text>
        ) : null}
        {status ? (
          <HStack space="sm" style={{ marginTop: 4 }}>
            <StatusBadge status={status} />
          </HStack>
        ) : null}
      </VStack>
    </Pressable>
  );
}
