import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';

interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

export function IconButton({
  icon,
  text,
  onPress,
  color = 'primary',
  disabled = false,
}: IconButtonProps) {
  const colors = useThemeColors();

  const colorMap = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  };

  const bgColor = colorMap[color];
  const containerBg = colors.card;
  const textColor = colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={(state) => ({
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        marginHorizontal: 6,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: state.pressed
          ? colors.pressedAlpha
          : containerBg,
        borderWidth: 1,
        borderColor: colors.border,
      })}
    >
      <View style={{ alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: bgColor + '20',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: bgColor,
            textAlign: 'center',
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
