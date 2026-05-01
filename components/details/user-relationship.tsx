import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { resolveId } from '@/utils/resolve-ref';
import { useRouter } from 'expo-router';

import React from 'react';

import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

interface UserRelationshipProps {
  orgId: string;
  item: any;
}

export function UserRelationship({ orgId, item }: UserRelationshipProps) {
  const router = useRouter();
  const { card, text, sub, border, primary } = useThemeColors();
  const Icon = ENTITY_ICONS.user;

  const containerStyle = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
  };

  const user = typeof item?.user === 'object' && item.user ? item.user : null;
  const displayName = user?.user?.name || user?.user?.email;

  if (!displayName) {
    return (
      <HStack className="items-center" style={containerStyle}>
        <Text style={{ fontSize: 13, color: sub, flex: 1 }}>Assigned User</Text>
        <Text style={{ fontSize: 13, color: sub }}>—</Text>
      </HStack>
    );
  }

  const route = `/admin/user/${orgId}/${resolveId(item.user)}`;

  return (
    <Pressable
      onPress={() => router.push(route as any)}
      style={({ pressed }) => ({ ...containerStyle, opacity: pressed ? 0.7 : 1 })}
    >
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
          <Text style={{ fontSize: 11, color: sub }}>Assigned User</Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: text }} numberOfLines={1}>
            {displayName}
          </Text>
        </VStack>
        <I.chevronRight size={16} color={sub} />
      </HStack>
    </Pressable>
  );
}
