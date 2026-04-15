import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Check, ChevronDown, Search, UsersRound } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GroupItem {
  _id: string;
  title?: string;
  name?: string;
}

interface GroupSelectProps {
  groups: GroupItem[];
  selectedId?: string | null;
  onSelect: (groupId: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

function getGroupDisplay(g: GroupItem): string {
  return g.title || g.name || 'Unknown';
}

export function GroupSelect({
  groups,
  selectedId,
  onSelect,
  isLoading,
  disabled,
}: GroupSelectProps) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const Icon = ENTITY_ICONS.group;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = useMemo(
    () => groups.find((g) => g._id === selectedId),
    [groups, selectedId],
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return groups;
    const q = search.toLowerCase();
    return groups.filter((g) => getGroupDisplay(g).toLowerCase().includes(q));
  }, [groups, search]);

  const containerStyle = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    opacity: disabled ? 0.5 : 1,
  };

  const displayName = selected ? getGroupDisplay(selected) : null;

  return (
    <>
      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        style={({ pressed }) => ({
          ...containerStyle,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        })}
      >
        {!displayName ? (
          <HStack space="sm" className="items-center">
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: primary + '10',
                borderWidth: 1,
                borderColor: primary + '30',
                borderStyle: 'dashed',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UsersRound size={16} color={primary} />
            </View>
            <VStack className="flex-1">
              <Text style={{ fontSize: 13, fontWeight: '500', color: sub }}>Not assigned to a group</Text>
              <Text style={{ fontSize: 11, color: primary }}>Tap to assign</Text>
            </VStack>
            <ChevronDown size={16} color={sub} />
          </HStack>
        ) : (
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
              <Text style={{ fontSize: 11, color: sub }}>Group</Text>
              <Text
                style={{ fontSize: 13, fontWeight: '500', color: text }}
                numberOfLines={1}
              >
                {displayName}
              </Text>
            </VStack>
            <ChevronDown size={16} color={sub} />
          </HStack>
        )}
      </Pressable>

      <Modal
        transparent
        animationType="slide"
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setIsOpen(false)}
        >
          <View style={{ flex: 1 }} />
          <Pressable>
            <SafeAreaView
              edges={['bottom']}
              style={{
                backgroundColor: card,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                maxHeight: '70%',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 6,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: border,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: text,
                  paddingHorizontal: 16,
                  paddingBottom: 10,
                }}
              >
                Select Group
              </Text>

              <HStack
                space="sm"
                className="items-center"
                style={{
                  marginHorizontal: 16,
                  marginBottom: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  backgroundColor: bg,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: border,
                }}
              >
                <Search size={16} color={sub} />
                <TextInput
                  placeholder="Search groups..."
                  placeholderTextColor={sub}
                  value={search}
                  onChangeText={setSearch}
                  style={{ flex: 1, fontSize: 14, color: text, padding: 0 }}
                />
              </HStack>

              {isLoading ? (
                <View
                  style={{
                    padding: 32,
                    alignItems: 'center',
                  }}
                >
                  <ActivityIndicator color={primary} />
                </View>
              ) : (
                <FlatList
                  data={filtered}
                  keyExtractor={(item) => item._id}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item: g }) => {
                    const isSelected = g._id === selectedId;
                    return (
                      <Pressable
                        onPress={() => {
                          onSelect(g._id);
                          setIsOpen(false);
                          setSearch('');
                        }}
                        style={({ pressed }) => ({
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          backgroundColor: pressed
                            ? primary + '10'
                            : isSelected
                              ? primary + '08'
                              : 'transparent',
                        })}
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
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 14,
                              color: text,
                              fontWeight: isSelected ? '600' : '400',
                            }}
                            numberOfLines={1}
                          >
                            {getGroupDisplay(g)}
                          </Text>
                          {isSelected ? (
                            <Check size={18} color={primary} />
                          ) : null}
                        </HStack>
                      </Pressable>
                    );
                  }}
                  ListEmptyComponent={
                    <Text
                      style={{
                        textAlign: 'center',
                        color: sub,
                        fontSize: 14,
                        padding: 24,
                      }}
                    >
                      No groups found
                    </Text>
                  }
                  style={{ maxHeight: 350 }}
                />
              )}
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
