import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

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
