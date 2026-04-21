import React from 'react';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface StatusBadgeProps {
  status: string;
  color?: string;
}

export function StatusBadge({ status, color }: StatusBadgeProps) {
  const { primary } = useThemeColors();
  let badgeColor = color ?? primary;
  switch (status.toLowerCase()) {
    case 'active':
    case 'approved':
      badgeColor = '#22c55e';
      break;
    case 'inactive':
      badgeColor = '#6b7280';
      break;
    case 'pending':
      badgeColor = '#f59e0b';
      break;
    case 'archived':
      badgeColor = '#6b7280';
      break;
    case 'error':
    case 'rejected':
      badgeColor = '#ef4444';
      break;
  }

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
