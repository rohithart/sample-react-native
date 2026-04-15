import { HStack } from '@/components/ui/hstack';
import { StatusBadge } from '@/components/ui/status-badge';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

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
  const { card, text, sub, border, primary, pressed } = useThemeColors();

  const Icon = ENTITY_ICONS[config.icon];
  const title = resolveField(item, config.titleField) || 'Untitled';
  const subtitle = resolveField(item, config.subtitleField);
  const image = resolveField(item, config.imageField);
  const status = resolveField(item, config.statusField);

  return (
    <Pressable
      onPress={onPress ?? (() => router.push(config.detailRoute(orgId, item._id) as any))}
      style={({ pressed: isPressed }) => ({
        padding: 14,
        marginHorizontal: 12,
        marginVertical: 5,
        backgroundColor: isPressed ? pressed : card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
      })}
    >
      <HStack space="md" className="items-center">
        {/* Avatar — image or icon fallback */}
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 44, height: 44, borderRadius: 10 }}
          />
        ) : (
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: primary + '15',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={20} color={primary} />
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
        <ChevronRight size={18} color={sub} />
      </HStack>
    </Pressable>
  );
}
