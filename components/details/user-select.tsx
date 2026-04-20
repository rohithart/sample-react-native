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
import { UserDisplay } from '../user';
import { UserRole } from '@/types';

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
    return u.user.name || u.user.email || 'Unknown';
  }
  return 'Unknown';
}

function getUserEmail(u: UserRole): string {
  if (typeof u.user === 'object' && u.user) {
    return u.user.email || 'Unknown';
  }
  return 'Unknown';
}

export function UserSelect({
  users,
  selectedId,
  onSelect,
  isLoading,
  disabled,
}: UserSelectProps) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const Icon = ENTITY_ICONS.user;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selected = useMemo(
    () => users.find((u) => u._id === selectedId),
    [users, selectedId],
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) => getUserDisplay(u).toLowerCase().includes(q));
  }, [users, search]);

  const containerStyle = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    opacity: disabled ? 0.5 : 1,
  };

  const displayName = selected ? getUserDisplay(selected) : null;

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
              <I.userPlus size={16} color={primary} />
            </View>
            <VStack className="flex-1">
              <Text style={{ fontSize: 13, fontWeight: '500', color: sub }}>Not assigned to a user</Text>
              <Text style={{ fontSize: 11, color: primary }}>Tap to assign</Text>
            </VStack>
            <I.chevronDown size={16} color={sub} />
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
              <Text style={{ fontSize: 11, color: sub }}>Assigned User</Text>
              <Text
                style={{ fontSize: 13, fontWeight: '500', color: text }}
                numberOfLines={1}
              >
                {displayName}
              </Text>
            </VStack>
            <I.chevronDown size={16} color={sub} />
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
                Select User
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
                <I.search size={16} color={sub} />
                <TextInput
                  placeholder="I.search users..."
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
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          backgroundColor: pressed
                            ? primary + '10'
                            : isSelected
                              ? primary + '08'
                              : 'transparent',
                        })}
                      >
                        <HStack space="sm" className="items-center" style={{margin: 10}}>
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
                            <UserDisplay userRole={u} />
                          </View>
                          <VStack className="flex-1">
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 14,
                                color: text,
                                fontWeight: isSelected ? '600' : '400',
                              }}
                              numberOfLines={1}
                            >
                              {getUserDisplay(u)}
                            </Text>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 12,
                                color: text,
                                fontWeight: isSelected ? '600' : '400',
                              }}
                              numberOfLines={1}
                            >
                              {getUserEmail(u)}
                            </Text>
                          </VStack>
                          
                          {isSelected ? (
                            <I.check size={18} color={primary} />
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
                      No users found
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
