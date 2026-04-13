import React from 'react';
import { Text } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface SectionHeadingProps {
  title: string;
}

export function SectionHeading({ title }: SectionHeadingProps) {
  const { sub } = useThemeColors();

  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
        color: sub,
      }}
    >
      {title}
    </Text>
  );
}
