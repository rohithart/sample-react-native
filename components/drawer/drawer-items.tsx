import { HStack } from '@/components/ui/hstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { SectionHeader } from '../section-header';

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
        paddingLeft: indent ? 48 : 12,
        paddingRight: 12,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 4,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
      
        backgroundColor: pressed ? colors.primary + '08' : 'transparent',
      })}
    >
      <HStack space="md" style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 12,
            backgroundColor: colors.primary + '16',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
        
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 15,
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

export function DrawerSectionHeading({ title }: { title: string }) {
  return (
    <View style={{ 
      paddingHorizontal: 14, 
      padding: 8, 
    }}>
      <SectionHeader title={title} />
    </View>
  );
}

export function DrawerDivider() {
  const colors = useThemeColors();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginHorizontal: 24,
        marginVertical: 8,
        opacity: 0.5,
      }}
    />
  );
}
