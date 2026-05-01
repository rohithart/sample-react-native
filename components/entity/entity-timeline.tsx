import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useTimeline } from '@/services/timeline';
import type { Timeline } from '@/types';

import { FullScreenModal } from '@/components/ui/full-screen-modal';
import { LoadingList } from '@/components/skeleton';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';
import { convertToLocalDateTimeString } from '@/utils/date';
import React from 'react';
import { FlatList } from 'react-native';

const I = ENTITY_ICONS;

interface EntityTimelineProps {
  isVisible: boolean;
  onClose: () => void;
  entity: EntityType;
  entityId: string;
}

const DOT_SIZE = 12;
const LINE_WIDTH = 2;

export function EntityTimeline({ isVisible, onClose, entity, entityId }: EntityTimelineProps) {
  const colors = useThemeColors();
  const { data: entries, isLoading } = useTimeline(entity, entityId);

  const renderItem = ({ item, index }: { item: Timeline; index: number }) => {
    const isLeft = !!item.secondaryId;
    const isLast = index === (entries?.length ?? 0) - 1;
    const isFirst = index === 0;

    const card = (
      <VStack
        space="xs"
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }} numberOfLines={3}>
          {item.message}
        </Text>
        <Text style={{ fontSize: 11, color: colors.sub }}>{item.category}</Text>
        <Text style={{ fontSize: 10, color: colors.sub }}>{item.createdBy}</Text>
      </VStack>
    );

    return (
      <HStack className="items-start" style={{ minHeight: 72 }}>
        <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-end' }}>
          {isLeft ? card : null}
        </View>

        <View style={{ alignItems: 'center', width: 48 }}>
          {!isFirst && (
            <View style={{ width: LINE_WIDTH, height: 8, backgroundColor: colors.border }} />
          )}
          <View
            style={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              backgroundColor: isFirst ? colors.primary : colors.secondary,
              zIndex: 1,
            }}
          />
          <View
            style={{
              backgroundColor: colors.bg,
              paddingHorizontal: 2,
              paddingVertical: 1,
              marginTop: 2,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: '600', color: colors.sub, textAlign: 'center' }}>
              {convertToLocalDateTimeString(item.createdAt)}
            </Text>
          </View>
          {!isLast && (
            <View style={{ width: LINE_WIDTH, flex: 1, backgroundColor: colors.border, minHeight: 12 }} />
          )}
        </View>

        <View style={{ flex: 1, paddingLeft: 10, alignItems: 'flex-start' }}>
          {!isLeft ? card : null}
        </View>
      </HStack>
    );
  };

  return (
    <FullScreenModal visible={isVisible} onClose={onClose} title="Timeline">
      {isLoading ? (
        <LoadingList count={4} />
      ) : !entries?.length ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          <I.clock size={48} color={colors.sub} strokeWidth={1.2} />
          <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No timeline entries yet</Text>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(i) => i._id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, gap: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </FullScreenModal>
  );
}
