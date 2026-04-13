import React from 'react';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface StatusBadgeProps {
  status: string;
  color?: string;
}

export function StatusBadge({ status, color }: StatusBadgeProps) {
  const { primary } = useThemeColors();
  const badgeColor = color ?? primary;

  return (
    <View
      style={{
        backgroundColor: badgeColor + '20',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 11,
          color: badgeColor,
          fontWeight: '600',
          textTransform: 'capitalize',
        }}
      >
        {status}
      </Text>
    </View>
  );
}
