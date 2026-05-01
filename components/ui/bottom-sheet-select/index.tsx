import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

interface BottomSheetSelectProps<T> {
  visible: boolean;
  onClose: () => void;
  title: string;
  searchPlaceholder: string;
  emptyMessage: string;
  data: T[];
  isLoading?: boolean;
  selectedId?: string | null;
  keyExtractor: (item: T) => string;
  onSelect: (item: T) => void;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  filterFn: (item: T, query: string) => boolean;
}

export function BottomSheetSelect<T>({
  visible,
  onClose,
  title,
  searchPlaceholder,
  emptyMessage,
  data,
  isLoading,
  selectedId,
  keyExtractor,
  onSelect,
  renderItem,
  filterFn,
}: BottomSheetSelectProps<T>) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) => filterFn(item, search.toLowerCase()));
  }, [data, search, filterFn]);

  const handleSelect = (item: T) => {
    onSelect(item);
    onClose();
    setSearch('');
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
        onPress={onClose}
      >
        <SafeAreaView
          edges={['bottom']}
          style={{ backgroundColor: card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%' }}
        >
          <View style={{ alignItems: 'center', paddingVertical: 12 }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: border }} />
          </View>

          <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: text }}>{title}</Text>

            <HStack
              space="sm"
              style={{
                marginTop: 12,
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: bg,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: border,
                alignItems: 'center',
              }}
            >
              <I.search size={18} color={sub} />
              <TextInput
                placeholder={searchPlaceholder}
                placeholderTextColor={sub}
                value={search}
                onChangeText={setSearch}
                style={{ flex: 1, fontSize: 15, color: text, paddingVertical: 0 }}
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch('')}>
                  <I.close size={16} color={sub} />
                </Pressable>
              )}
            </HStack>
          </View>

          {isLoading ? (
            <View style={{ padding: 40, alignItems: 'center' }}>
              <ActivityIndicator color={primary} />
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={keyExtractor}
              contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
              renderItem={({ item }) => {
                const isSelected = keyExtractor(item) === selectedId;
                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      marginBottom: 4,
                      borderRadius: 12,
                      backgroundColor: isSelected ? primary + '10' : pressed ? bg : 'transparent',
                    })}
                  >
                    {renderItem(item, isSelected)}
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Text style={{ color: sub }}>{emptyMessage}</Text>
                </View>
              }
            />
          )}
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}
