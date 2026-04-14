import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

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

  if (!value) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 14,
          backgroundColor: card,
          borderWidth: 1,
          borderColor: border,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 13, color: sub, flex: 1 }}>{label}</Text>
        <Text style={{ fontSize: 13, color: sub }}>—</Text>
      </View>
    );
  }

  const Wrapper = route ? Pressable : View;
  const wrapperProps = route
    ? { onPress: () => router.push(route as any), style: ({ pressed }: { pressed: boolean }) => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: card,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 10,
        opacity: pressed ? 0.7 : 1,
        gap: 10,
      }) }
    : { style: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: card,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 10,
        gap: 10,
      } };

  return (
    // @ts-ignore — dynamic Wrapper
    <Wrapper {...wrapperProps}>
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
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 11, color: sub }}>{label}</Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: text }} numberOfLines={1}>
          {value}
        </Text>
      </View>
      {route ? <ChevronRight size={16} color={sub} /> : null}
    </Wrapper>
  );
}
