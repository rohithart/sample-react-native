import { BottomSheetSelect } from '@/components/ui/bottom-sheet-select';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { UserRole } from '@/types';
import React, { useCallback, useMemo, useState } from 'react';
import { SectionHeader } from '../section-header';
import { UserAvatar } from '../user-avatar';

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

const filterUser = (u: UserRole, query: string) =>
  getUserDisplay(u).toLowerCase().includes(query) ||
  getUserEmail(u).toLowerCase().includes(query);

const extractKey = (u: UserRole) => u._id;

export function UserSelect({ users, selectedId, onSelect, isLoading, disabled }: UserSelectProps) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const selected = useMemo(
    () => users.find((u) => u._id === selectedId),
    [users, selectedId]
  );

  const displayName = selected ? getUserDisplay(selected) : null;

  const renderItem = useCallback((u: UserRole, isSelected: boolean) => (
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
  ), [primary, text, sub]);

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

      <BottomSheetSelect
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select Assignee"
        searchPlaceholder="Search by name or email..."
        emptyMessage="No users found"
        data={users}
        isLoading={isLoading}
        selectedId={selectedId}
        keyExtractor={extractKey}
        onSelect={(u) => onSelect(u._id)}
        renderItem={renderItem}
        filterFn={filterUser}
      />
    </>
  );
}
