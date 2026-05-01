import { BottomSheetSelect } from '@/components/ui/bottom-sheet-select';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { VStack } from '@/components/ui/vstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Group } from '@/types';
import React, { useCallback, useMemo, useState } from 'react';
import { SectionHeader } from '../section-header';

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

const filterGroup = (g: Group, query: string) =>
  getGroupDisplay(g).toLowerCase().includes(query) ||
  getGroupDescription(g).toLowerCase().includes(query);

const extractKey = (g: Group) => g._id;

export function GroupSelect({ groups, selectedId, onSelect, isLoading, disabled }: GroupSelectProps) {
  const { card, text, sub, border, primary, bg } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const selected = useMemo(
    () => groups.find((g) => g._id === selectedId),
    [groups, selectedId]
  );

  const displayName = selected ? getGroupDisplay(selected) : null;

  const renderItem = useCallback((g: Group, isSelected: boolean) => (
    <HStack space="md" style={{ alignItems: 'center', marginBottom: 4 }}>
      <View style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: isSelected ? primary + '20' : primary + '10',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
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
            <I.usersRound size={18} color={selected ? primary : sub} />
          </View>

          <VStack style={{ flex: 1 }}>
            <SectionHeader title="Assigned Group" style={{ fontSize: 10, fontWeight: '700' }} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: selected ? text : sub }} numberOfLines={1}>
              {displayName || 'Select Group'}
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
        title="Select Group"
        searchPlaceholder="Search groups..."
        emptyMessage="No groups found"
        data={groups}
        isLoading={isLoading}
        selectedId={selectedId}
        keyExtractor={extractKey}
        onSelect={(g) => onSelect(g._id)}
        renderItem={renderItem}
        filterFn={filterGroup}
      />
    </>
  );
}
