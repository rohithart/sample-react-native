import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';

import React from 'react';
import { Pressable, Text, View } from 'react-native';

const I = ENTITY_ICONS;

interface LinkedFieldProps {
  label: string;
  value?: string | null;
  icon: EntityIconKey;
  route?: string;
}

export function LinkedField({ label, value, icon, route }: LinkedFieldProps) {
  const router = useRouter();
  const { card, text, sub, border, primary } = useThemeColors();
  const Icon = ENTITY_ICONS[icon];

  const containerStyle = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
  };

  if (!value) {
    return (
      <HStack className="items-center" style={containerStyle}>
        <Text style={{ fontSize: 13, color: sub, flex: 1 }}>{label}</Text>
        <Text style={{ fontSize: 13, color: sub }}>—</Text>
      </HStack>
    );
  }

  const content = (
    <HStack space="sm" className="items-center">
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: primary + '15',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={16} color={primary} />
      </View>
      <VStack className="flex-1">
        <Text style={{ fontSize: 11, color: sub }}>{label}</Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: text }} numberOfLines={1}>
          {value}
        </Text>
      </VStack>
      {route ? <I.chevronRight size={16} color={sub} /> : null}
    </HStack>
  );

  if (route) {
    return (
      <Pressable
        onPress={() => router.push(route as any)}
        style={({ pressed }) => ({ ...containerStyle, opacity: pressed ? 0.7 : 1 })}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{content}</View>;
}
