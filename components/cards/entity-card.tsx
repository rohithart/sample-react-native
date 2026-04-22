import { HStack } from '@/components/ui/hstack';
import { StatusBadge } from '@/components/ui/status-badge';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';

import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const I = ENTITY_ICONS;

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

function resolveField(item: any, field: string | ((item: any) => any) | undefined): any {
  if (field == null) return undefined;
  if (typeof field === 'function') return field(item);
  return item[field];
}

export function EntityCard({ item, config, orgId, onPress }: EntityCardProps) {
  const router = useRouter();
  const { card, text, sub, border, primary, pressed } = useThemeColors();

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
        shadowColor: text,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 1, 
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
        <HStack space="md" style={{ padding: 2, alignItems: 'center' }}>
          {/* Leading Section */}
          <View>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 50, height: 50, borderRadius: 12 }}
              />
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: primary + '10',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={22} color={primary} />
              </View>
            )}
          </View>

          {/* Middle Section */}
          <VStack style={{ flex: 1 }}>
            <Text 
              numberOfLines={1} 
              style={{ fontSize: 16, fontWeight: '700', color: text, marginBottom: 2 }}
            >
              {title}
            </Text>
            
            {subtitle && (
              <Text numberOfLines={1} style={{ fontSize: 13, color: sub, marginBottom: 6 }}>
                {subtitle}
              </Text>
            )}

            {status && (
              <View style={{ alignSelf: 'flex-start' }}>
                <StatusBadge status={status} />
              </View>
            )}
          </VStack>

          {/* Trailing Icon */}
          <I.chevronRight size={18} color={sub} />
        </HStack>
    </Pressable>
    </View>
  );
}
