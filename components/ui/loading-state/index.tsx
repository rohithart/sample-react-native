import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/ui/text';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  const colors = useThemeColors();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>{message}</Text>
    </View>
  );
}
