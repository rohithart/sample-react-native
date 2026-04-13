import { useThemeColors } from '@/hooks/use-theme-colors';
import { useHistory } from '@/services/history';
import type { HistoryEntry } from '@/types';
import { History, X } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type HistoryEntity = 'workflow' | 'task' | 'quote' | 'invoice' | 'workorder' | 'evidence';

interface EntityHistoryProps {
  isVisible: boolean;
  onClose: () => void;
  entity: HistoryEntity;
  entityId: string;
}

export function EntityHistory({ isVisible, onClose, entity, entityId }: EntityHistoryProps) {
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const { data: entries, isLoading } = useHistory(entity, entityId);

  const renderItem = ({ item }: { item: HistoryEntry }) => (
    <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, gap: 6 }}>
      <Text style={{ color: colors.text, fontSize: 14, fontWeight: '500' }}>{item.action}</Text>
      {(item.previousValue != null || item.newValue != null) && (
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {item.previousValue != null && (
            <View style={{ backgroundColor: colors.dangerBg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ color: colors.danger, fontSize: 12 }}>{String(item.previousValue)}</Text>
            </View>
          )}
          {item.previousValue != null && item.newValue != null && (
            <Text style={{ color: colors.sub, fontSize: 12, alignSelf: 'center' }}>→</Text>
          )}
          {item.newValue != null && (
            <View style={{ backgroundColor: colors.primary + '15', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ color: colors.primary, fontSize: 12 }}>{String(item.newValue)}</Text>
            </View>
          )}
        </View>
      )}
      <Text style={{ color: colors.sub, fontSize: 11 }}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  if (!isVisible) return null;

  return (
    <Modal transparent animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>History</Text>
          <Pressable onPress={onClose} style={{ padding: 4 }}>
            <X size={22} color={colors.sub} />
          </Pressable>
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading history...</Text>
          </View>
        ) : !entries?.length ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
            <History size={48} color={colors.sub} strokeWidth={1.2} />
            <Text style={{ color: colors.sub, fontSize: 15, marginTop: 12, textAlign: 'center' }}>No history entries yet</Text>
          </View>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(i) => i._id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: bottom + 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}
