import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import type { StatusOption } from '@/constants/status';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React, { useMemo, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { SectionHeader } from '../section-header';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';

const I = ENTITY_ICONS;

interface StatusSelectProps {
  statuses: StatusOption[];
  selectedValue?: string | null;
  onSelect: (status: string) => void;
  disabled?: boolean;
}

export function StatusSelect({ statuses, selectedValue, onSelect, disabled }: StatusSelectProps) {
  const { card, text, sub, border, bg } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const selected = useMemo(
    () => statuses.find((s) => s.value === selectedValue),
    [statuses, selectedValue],
  );

  return (
    <>
      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        style={({ pressed }) => ({
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: card,
          borderWidth: 1,
          borderColor: selected ? selected.color + '40' : border,
          borderRadius: 14,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          shadowColor: selected?.color || 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        })}
      >
        <HStack space="md" style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: selected ? selected.color + '15' : sub + '10',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selected ? (
              <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: selected.color, borderWidth: 2, borderColor: card }} />
            ) : (
              <I.circle size={18} color={sub} />
            )}
          </View>

          <VStack style={{ flex: 1 }}>
            <SectionHeader title="Current Status" style={{ fontSize: 10, fontWeight: '700' }} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: selected ? text : sub }} numberOfLines={1}>
              {selected?.label || 'Set Status'}
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
          <SafeAreaView edges={['bottom']} style={{ backgroundColor: card, borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' }}>
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: border }} />
            </View>

            <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: text }}>Change Status</Text>
              <Text style={{ fontSize: 13, color: sub, marginTop: 2 }}>Select the current stage of this workflow</Text>
            </View>

            <ScrollView bounces={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}>
              {statuses.map((s) => {
                const isSelected = s.value === selectedValue;
                return (
                  <Pressable
                    key={s.value}
                    onPress={() => {
                      onSelect(s.value);
                      setIsOpen(false);
                    }}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 12,
                      marginBottom: 8,
                      borderRadius: 16,
                      backgroundColor: isSelected ? s.color + '10' : pressed ? bg : 'transparent',
                      borderWidth: 1,
                      borderColor: isSelected ? s.color + '30' : 'transparent',
                    })}
                  >
                    <HStack space="md" style={{ alignItems: 'center', marginBottom: 4 }}>
                      <View style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: s.color + '15',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 14
                      }}>
                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: s.color }} />
                      </View>
                      <Text style={{ flex: 1, fontSize: 16, fontWeight: isSelected ? '700' : '500', color: text }}>
                        {s.label}
                      </Text>

                      {isSelected && (
                        <View style={{ backgroundColor: s.color, borderRadius: 12, padding: 4 }}>
                          <I.check size={14} color="#fff" />
                        </View>
                      )}
                     </HStack> 
                    
                  </Pressable>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
}
