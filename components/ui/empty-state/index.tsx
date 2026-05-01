import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  const colors = useThemeColors();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
      <Text style={{ color: colors.sub, fontSize: 15 }}>{message}</Text>
    </View>
  );
}
