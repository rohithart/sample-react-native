import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useHistory } from '@/services/history';
import type { HistoryChanges, History as HistoryType } from '@/types';

import React from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';
import { convertToLocalDateTimeString } from '@/utils/date';

const I = ENTITY_ICONS;

interface EntityHistoryProps {
  isVisible: boolean;
  onClose: () => void;
  entity: EntityType;
  entityId: string;
}

export function EntityHistory({ isVisible, onClose, entity, entityId }: EntityHistoryProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { data: entries, isLoading } = useHistory(entity, entityId);

  const renderChange = (change: HistoryChanges, idx: number) => (
    <HStack key={idx} space="sm" className="items-center" style={{ flexWrap: 'wrap' }}>
      <Text style={{ fontSize: 12, fontWeight: '500', color: colors.text }}>{change.field}</Text>
      {change.oldValue != null && (
        <View style={{ backgroundColor: colors.dangerBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ color: colors.danger, fontSize: 11 }}>{String(change.oldValue)}</Text>
        </View>
      )}
      {change.oldValue != null && change.newValue != null && (
        <Text style={{ color: colors.sub, fontSize: 12 }}>→</Text>
      )}
      {change.newValue != null && (
        <View style={{ backgroundColor: colors.primary + '15', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ color: colors.primary, fontSize: 11 }}>{String(change.newValue)}</Text>
        </View>
      )}
    </HStack>
  );

  const renderItem = ({ item }: { item: HistoryType }) => (
    <VStack space="sm" style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12 }}>
      <HStack className="justify-between items-center">
        <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>{item.action}</Text>
      </HStack>
      <Text style={{ color: colors.sub, fontSize: 11 }}>by {item.updatedBy}</Text>
      {item.changes?.length > 0 && (
        <VStack space="sm" style={{ paddingTop: 4, borderTopWidth: 1, borderTopColor: colors.border }}>
          {item.changes.map(renderChange)}
        </VStack>
      )}
      <Text style={{ color: colors.sub, fontSize: 10 }}>{convertToLocalDateTimeString(item.createdAt)}</Text>
    </VStack>
  );

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <HStack className="items-center justify-between" style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>History</Text>
          <Pressable onPress={onClose} style={{ padding: 4 }}>
            <I.close size={22} color={colors.sub} />
          </Pressable>
        </HStack>

        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading history...</Text>
          </View>
        ) : !entries?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <I.history size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No history entries yet</Text>
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
      </SafeAreaView>
    </Modal>
  );
}
