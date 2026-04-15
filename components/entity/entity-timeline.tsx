import { useThemeColors } from '@/hooks/use-theme-colors';
import { useTimeline } from '@/services/timeline';
import type { Timeline } from '@/types';
import { Clock, X } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type TimelineEntity = 'user' | 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence' | 'vote' | 'vendor' | 'document' | 'asset' | 'financial-year';

interface EntityTimelineProps {
  isVisible: boolean;
  onClose: () => void;
  entity: TimelineEntity;
  entityId: string;
}

const DOT_SIZE = 12;
const LINE_WIDTH = 2;

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}
function fmtTime(d: string) {
  return new Date(d).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
}

export function EntityTimeline({ isVisible, onClose, entity, entityId }: EntityTimelineProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { data: entries, isLoading } = useTimeline(entity, entityId);

  const renderItem = ({ item, index }: { item: Timeline; index: number }) => {
    const isLeft = !!item.secondaryId;
    const isLast = index === (entries?.length ?? 0) - 1;
    const isFirst = index === 0;

    const card = (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          padding: 10,
          gap: 4,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }} numberOfLines={3}>
          {item.message}
        </Text>
        <Text style={{ fontSize: 11, color: colors.sub }}>{item.category}</Text>
        <Text style={{ fontSize: 10, color: colors.sub }}>{item.createdBy}</Text>
      </View>
    );

    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', minHeight: 72 }}>
        {/* Left content */}
        <View style={{ flex: 1, paddingRight: 10, alignItems: 'flex-end' }}>
          {isLeft ? card : null}
        </View>

        {/* Center line + dot + date */}
        <View style={{ alignItems: 'center', width: 48 }}>
          {/* Connecting line above dot */}
          {!isFirst && (
            <View style={{ width: LINE_WIDTH, height: 8, backgroundColor: colors.border }} />
          )}
          {/* Dot */}
          <View
            style={{
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              backgroundColor: isFirst ? colors.primary : colors.secondary,
              zIndex: 1,
            }}
          />
          {/* Date label on the line */}
          <View
            style={{
              backgroundColor: colors.bg,
              paddingHorizontal: 2,
              paddingVertical: 1,
              marginTop: 2,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: '600', color: colors.sub, textAlign: 'center' }}>
              {fmtDate(item.createdAt)}
            </Text>
            <Text style={{ fontSize: 8, color: colors.sub, textAlign: 'center' }}>
              {fmtTime(item.createdAt)}
            </Text>
          </View>
          {/* Connecting line below */}
          {!isLast && (
            <View style={{ width: LINE_WIDTH, flex: 1, backgroundColor: colors.border, minHeight: 12 }} />
          )}
        </View>

        {/* Right content */}
        <View style={{ flex: 1, paddingLeft: 10, alignItems: 'flex-start' }}>
          {!isLeft ? card : null}
        </View>
      </View>
    );
  };

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>Timeline</Text>
          <Pressable onPress={onClose} style={{ padding: 4 }}>
            <X size={22} color={colors.sub} />
          </Pressable>
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading timeline...</Text>
          </View>
        ) : !entries?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <Clock size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No timeline entries yet</Text>
          </View>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(i) => i._id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16, paddingBottom: bottom + 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}
