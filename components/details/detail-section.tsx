import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Text, View } from 'react-native';

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
  const { sub } = useThemeColors();

  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: sub,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          paddingHorizontal: 2,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
