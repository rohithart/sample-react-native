import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { resolveId } from '@/utils/resolve-ref';
import { useRouter } from 'expo-router';

import React from 'react';
import { Text, View } from 'react-native';
import { Pressable } from '@/components/ui/pressable';

const I = ENTITY_ICONS;

interface VendorRelationshipProps {
  orgId: string;
  item: any;
}

export function VendorRelationship({ orgId, item }: VendorRelationshipProps) {
  const router = useRouter();
  const { card, text, sub, border, primary } = useThemeColors();
  const Icon = ENTITY_ICONS.vendor;

  const containerStyle = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
  };

  const vendor = typeof item?.vendor === 'object' && item.vendor ? item.vendor : null;
  const displayName = vendor?.name;

  if (!displayName) {
    return (
      <HStack className="items-center" style={containerStyle}>
        <Text style={{ fontSize: 13, color: sub, flex: 1 }}>Vendor</Text>
        <Text style={{ fontSize: 13, color: sub }}>—</Text>
      </HStack>
    );
  }

  const route = `/admin/vendor/${orgId}/${resolveId(item.vendor)}`;

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
          <Text style={{ fontSize: 11, color: sub }}>Vendor</Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: text }} numberOfLines={1}>
            {displayName}
          </Text>
        </VStack>
        <I.chevronRight size={16} color={sub} />
      </HStack>
    </Pressable>
  );
}
