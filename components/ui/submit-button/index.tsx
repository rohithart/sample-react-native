import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';

interface SubmitButtonProps {
  onPress: () => void;
  isSubmitting: boolean;
  label: string;
  submittingLabel?: string;
}

export function SubmitButton({ onPress, isSubmitting, label, submittingLabel }: SubmitButtonProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={isSubmitting}
      style={({ pressed }) => ({
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        opacity: pressed || isSubmitting ? 0.7 : 1,
        marginTop: 8,
      })}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
        {isSubmitting ? (submittingLabel ?? 'Creating...') : label}
      </Text>
    </Pressable>
  );
}
