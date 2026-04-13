import { HStack } from '@/components/ui/hstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';

/** Icon + label pressable row. Works for all drawer contexts (home, admin, user). */
export function DrawerItem({
  icon,
  label,
  onPress,
  indent = false,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: (() => void) | ((event: GestureResponderEvent) => void);
  indent?: boolean;
}) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingLeft: indent ? 44 : 14,
        paddingRight: 14,
        paddingVertical: 10,
        marginHorizontal: 8,
        marginBottom: 2,
        borderRadius: 10,
        minHeight: 44,
        backgroundColor: pressed ? colors.primary + '14' : 'transparent',
      })}
    >
      <HStack space="md" className="items-center">
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: colors.primary + '10',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          pointerEvents="none"
        >
          {icon}
        </View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: '500',
            color: colors.text,
          }}
        >
          {label}
        </Text>
      </HStack>
    </Pressable>
  );
}


/** Uppercase section heading label. */
export function DrawerSectionHeading({ title }: { title: string }) {
  const colors = useThemeColors();
  return (
    <View style={{ paddingHorizontal: 14, paddingTop: 20, paddingBottom: 8, marginHorizontal: 8 }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: colors.sub,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

/** Thin horizontal rule between sections. */
export function DrawerDivider() {
  const colors = useThemeColors();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.separator,
        marginHorizontal: 22,
        marginVertical: 6,
        opacity: 0.6,
      }}
    />
  );
}
