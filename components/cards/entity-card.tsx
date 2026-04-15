import { HStack } from '@/components/ui/hstack';
import { StatusBadge } from '@/components/ui/status-badge';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';

import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const I = ENTITY_ICONS;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface EntityCardConfig {
  icon: EntityIconKey;
  titleField: string | ((item: any) => string);
  subtitleField?: string | ((item: any) => string | undefined);
  imageField?: string | ((item: any) => string | undefined);
  statusField?: string | ((item: any) => string | undefined);
  detailRoute: (orgId: string, itemId: string) => string;
}

interface EntityCardProps {
  item: Record<string, any>;
  config: EntityCardConfig;
  orgId: string;
  onPress?: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function resolveField(item: any, field: string | ((item: any) => any) | undefined): any {
  if (field == null) return undefined;
  if (typeof field === 'function') return field(item);
  return item[field];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function EntityCard({ item, config, orgId, onPress }: EntityCardProps) {
  const router = useRouter();
  const { card, text, sub, border, primary, pressed, isDark } = useThemeColors();

  const Icon = ENTITY_ICONS[config.icon];
  const title = resolveField(item, config.titleField) || 'Untitled';
  const subtitle = resolveField(item, config.subtitleField);
  const image = resolveField(item, config.imageField);
  const status = resolveField(item, config.statusField);

  return (
    <View
      style={{
        marginTop: 10,
        marginHorizontal: 14,
        borderRadius: 12,
        padding: 10,
        backgroundColor: card,
        // iOS Shadows
        shadowColor: text,
        shadowOffset: { width: 0, height: 6 }, // Increased height for deeper 3D look
        shadowOpacity: isDark ? 0.35 : 0.15,
        shadowRadius: 8,
        // Android Shadow
        elevation: 8, 
      }}
    >
      <Pressable
        onPress={onPress ?? (() => router.push(config.detailRoute(orgId, item._id) as any))}
        style={({ pressed: isPressed }) => ({
          padding: 14,
          backgroundColor: isPressed ? pressed : card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: border,
        })}
      >
      <HStack space="md" className="items-stretch">
        {/* Avatar — image or icon fallback */}
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 48, borderRadius: 10, aspectRatio: 1, alignSelf: 'center' }}
          />
        ) : (
          <View
            style={{
              width: 48,
              borderRadius: 10,
              backgroundColor: primary + '15',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={22} color={primary} />
          </View>
        )}

        {/* Content */}
        <VStack space="xs" className="flex-1">
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '600', color: text }}>
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={{ fontSize: 13, color: sub }}>
              {subtitle}
            </Text>
          ) : null}
          {status ? (
            <HStack style={{ marginTop: 4 }}>
              <StatusBadge status={status} />
            </HStack>
          ) : null}
        </VStack>

        {/* Chevron */}
        <HStack space="md" className='items-center'>
          <I.chevronRight size={18} color={sub} />
        </HStack>
      </HStack>
    </Pressable>
    </View>
  );
}
