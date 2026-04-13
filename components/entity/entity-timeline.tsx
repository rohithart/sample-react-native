import { useThemeColors } from '@/hooks/use-theme-colors';
import { useTimeline } from '@/services/timeline';
import type { TimelineEntry } from '@/types';
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

export function EntityTimeline({ isVisible, onClose, entity, entityId }: EntityTimelineProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { data: entries, isLoading } = useTimeline(entity, entityId);

  const renderItem = ({ item, index }: { item: TimelineEntry; index: number }) => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {/* Timeline line + dot */}
      <View style={{ alignItems: 'center', width: 20 }}>
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: index === 0 ? colors.primary : colors.border, marginTop: 4 }} />
        {index < (entries?.length ?? 0) - 1 && (
          <View style={{ width: 2, flex: 1, backgroundColor: colors.border, marginTop: 2 }} />
        )}
      </View>
      {/* Content */}
      <View style={{ flex: 1, paddingBottom: 16 }}>
        <Text style={{ color: colors.text, fontSize: 14, fontWeight: '500' }}>{item.action}</Text>
        {item.details && <Text style={{ color: colors.sub, fontSize: 13, marginTop: 2, lineHeight: 18 }}>{item.details}</Text>}
        <Text style={{ color: colors.sub, fontSize: 11, marginTop: 4 }}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
    </View>
  );

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
            contentContainerStyle={{ padding: 16, paddingBottom: bottom + 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}
