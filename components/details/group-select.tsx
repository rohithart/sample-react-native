import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Group } from '@/types';
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

const I = ENTITY_ICONS;

interface GroupSelectProps {
  groups: Group[];
  selectedId?: string | null;
  onSelect: (groupId: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

function getGroupDisplay(g: Group): string {
  return g.title || 'Unknown Group';
}

function getGroupDescription(g: Group): string {
  return g.description || 'No description available';
}

export function GroupSelect({ groups, selectedId, onSelect, isLoading, disabled }: GroupSelectProps) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = useMemo(
    () => groups.find((g) => g._id === selectedId),
    [groups, selectedId]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return groups;
    const q = search.toLowerCase();
    return groups.filter((g) => 
      getGroupDisplay(g).toLowerCase().includes(q) || 
      getGroupDescription(g).toLowerCase().includes(q)
    );
  }, [groups, search]);

  const displayName = selected ? getGroupDisplay(selected) : null;

  return (
    <>
      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        style={({ pressed }) => ({
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: card,
          borderWidth: 1,
          borderColor: border,
          borderRadius: 14,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        })}
      >
        <HStack space="md" style={{ alignItems: 'center' }}>
          <View style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: selected ? primary + '15' : bg,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: selected ? 0 : 1,
            borderColor: border,
            borderStyle: selected ? 'solid' : 'dashed'
          }}>
            <I.usersRound size={18} color={selected ? primary : sub} />
          </View>

          <VStack style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: sub, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Assigned Group
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: selected ? text : sub }} numberOfLines={1}>
              {displayName || 'Select Group'}
            </Text>
          </VStack>

          <View style={{ padding: 4, backgroundColor: bg, borderRadius: 8 }}>
            <I.chevronDown size={14} color={sub} />
          </View>
        </HStack>
      </Pressable>

      <Modal transparent animationType="fade" visible={isOpen} onRequestClose={() => setIsOpen(false)}>
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }} 
          onPress={() => setIsOpen(false)}
        >
          <SafeAreaView edges={['bottom']} style={{ backgroundColor: card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%' }}>
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: border }} />
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: text }}>Select Group</Text>
              
              <HStack space="sm" style={{ 
                marginTop: 12, 
                paddingHorizontal: 12, 
                paddingVertical: 10, 
                backgroundColor: bg, 
                borderRadius: 12, 
                borderWidth: 1, 
                borderColor: border,
                alignItems: 'center' 
              }}>
                <I.search size={18} color={sub} />
                <TextInput
                  placeholder="Search groups..."
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
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 12,
                        marginBottom: 4,
                        borderRadius: 12,
                        backgroundColor: isSelected ? primary + '10' : pressed ? bg : 'transparent',
                      })}
                    >
                      <HStack space="md" style={{ alignItems: 'center', marginBottom: 4 }}>
                        <View style={{
                          width: 38,
                          height: 38,
                          borderRadius: 10,
                          backgroundColor: isSelected ? primary + '20' : primary + '10',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 14
                        }}>
                          <I.group size={20} color={primary} />
                        </View>
                        
                        <VStack style={{ flex: 1 }}>
                          <Text style={{ fontSize: 15, fontWeight: isSelected ? '700' : '600', color: text }}>
                            {getGroupDisplay(g)}
                          </Text>
                          <Text style={{ fontSize: 12, color: sub }} numberOfLines={1}>
                            {getGroupDescription(g)}
                          </Text>
                        </VStack>

                        {isSelected && (
                          <View style={{ backgroundColor: primary, borderRadius: 12, padding: 4 }}>
                            <I.check size={14} color="#fff" />
                          </View>
                        )}
                      </HStack>
                      
                    </Pressable>
                  );
                }}
                ListEmptyComponent={
                  <View style={{ padding: 40, alignItems: 'center' }}>
                    <Text style={{ color: sub }}>No groups found</Text>
                  </View>
                }
              />
            )}
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
}
