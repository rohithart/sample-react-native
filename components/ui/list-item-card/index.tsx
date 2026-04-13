import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { StatusBadge } from '@/components/ui/status-badge';

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
      <Text style={{ fontSize: 16, fontWeight: '600', color: text }}>{title}</Text>
      {description ? (
        <Text style={{ fontSize: 13, color: sub, marginTop: 4 }}>{description}</Text>
      ) : null}
      {status ? (
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <StatusBadge status={status} />
        </View>
      ) : null}
    </Pressable>
  );
}
