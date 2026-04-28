import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
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
import { UserAvatar } from '../user-avatar'; // Assuming you have this
import { UserRole } from '@/types';
import { SectionHeader } from '../section-header';

const I = ENTITY_ICONS;

interface UserSelectProps {
  users: UserRole[];
  selectedId?: string | null;
  onSelect: (userId: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

function getUserDisplay(u: UserRole): string {
  if (typeof u.user === 'object' && u.user) {
    return u.user.name || u.user.email || 'Unknown User';
  }
  return 'Unknown User';
}

function getUserEmail(u: UserRole): string {
  if (typeof u.user === 'object' && u.user) {
    return u.user.email || '';
  }
  return '';
}

export function UserSelect({ users, selectedId, onSelect, isLoading, disabled }: UserSelectProps) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = useMemo(
    () => users.find((u) => u._id === selectedId),
    [users, selectedId]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) => getUserDisplay(u).toLowerCase().includes(q) || getUserEmail(u).toLowerCase().includes(q));
  }, [users, search]);

  const displayName = selected ? getUserDisplay(selected) : null;

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
            {selected ? (
              <UserAvatar userRole={selected} />
            ) : (
              <I.userPlus size={18} color={sub} />
            )}
          </View>

          <VStack style={{ flex: 1 }}>
            <SectionHeader title="Assignee" style={{ fontSize: 10, fontWeight: '700' }} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: selected ? text : sub }} numberOfLines={1}>
              {displayName || 'Unassigned'}
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
              <Text style={{ fontSize: 18, fontWeight: '800', color: text }}>Select Assignee</Text>
              
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
                  placeholder="Search by name or email..."
                  placeholderTextColor={sub}
                  value={search}
                  onChangeText={setSearch}
                  style={{ flex: 1, fontSize: 15, color: text, paddingVertical: 0 }}
                  autoFocus={false}
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
                renderItem={({ item: u }) => {
                  const isSelected = u._id === selectedId;
                  return (
                    <Pressable
                      onPress={() => {
                        onSelect(u._id);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      style={({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 4,
                        borderRadius: 12,
                        backgroundColor: isSelected ? primary + '10' : pressed ? bg : 'transparent',
                      })}
                    >
                      
                      <HStack space="md" style={{ alignItems: 'center', marginBottom: 4 }}>
                        <UserAvatar userRole={u} />
                        <VStack style={{ flex: 1, marginLeft: 12 }}>
                          <Text style={{ fontSize: 15, fontWeight: isSelected ? '700' : '600', color: text }}>
                            {getUserDisplay(u)}
                          </Text>
                          <Text style={{ fontSize: 12, color: sub }} numberOfLines={1}>
                            {getUserEmail(u)}
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
                    <Text style={{ color: sub }}>No users found</Text>
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
