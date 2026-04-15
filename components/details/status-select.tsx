import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import type { StatusOption } from '@/constants/status';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Check, ChevronDown, Circle } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StatusSelectProps {
  statuses: StatusOption[];
  selectedValue?: string | null;
  onSelect: (status: string) => void;
  disabled?: boolean;
}

export function StatusSelect({
  statuses,
  selectedValue,
  onSelect,
  disabled,
}: StatusSelectProps) {
  const { card, text, sub, border } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const selected = useMemo(
    () => statuses.find((s) => s.value === selectedValue),
    [statuses, selectedValue],
  );

  const containerStyle = {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: card,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
  };

  return (
    <>
      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        style={({ pressed }) => ({
          ...containerStyle,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        })}
      >
        {!selected ? (
          <HStack space="sm" className="items-center">
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: sub + '15',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Circle size={16} color={sub} />
            </View>
            <VStack className="flex-1">
              <Text style={{ fontSize: 13, fontWeight: '500', color: sub }}>
                No status
              </Text>
              <Text style={{ fontSize: 11, color: sub }}>Tap to set</Text>
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
                backgroundColor: selected.color + '25',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: selected.color,
                }}
              />
            </View>
            <VStack className="flex-1">
              <Text style={{ fontSize: 11, color: sub }}>Status</Text>
              <Text
                style={{ fontSize: 13, fontWeight: '500', color: text }}
                numberOfLines={1}
              >
                {selected.label}
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
                Update Status
              </Text>

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
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      backgroundColor: pressed
                        ? s.color + '15'
                        : isSelected
                          ? s.color + '10'
                          : 'transparent',
                    })}
                  >
                    <HStack space="sm" className="items-center">
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          backgroundColor: s.color + '25',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: s.color,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 14,
                          color: text,
                          fontWeight: isSelected ? '600' : '400',
                        }}
                      >
                        {s.label}
                      </Text>
                      {isSelected ? <Check size={18} color={s.color} /> : null}
                    </HStack>
                  </Pressable>
                );
              })}

              <View style={{ height: 8 }} />
            </SafeAreaView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
