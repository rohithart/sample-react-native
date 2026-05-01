import React, { useState } from 'react';
import { Modal, Text, View, SafeAreaView } from 'react-native';
import { HStack } from '../ui/hstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { SectionHeader } from '../section-header';
import { Pressable } from '@/components/ui/pressable';

const I = ENTITY_ICONS;

const PRIORITIES = [
  { value: 'LOW', label: 'Low', color: '#94a3b8' },
  { value: 'MEDIUM', label: 'Medium', color: '#f59e0b' },
  { value: 'HIGH', label: 'High', color: '#ef4444' },
];

export function PrioritySelect({ priority, onSelect, disabled }: any) {
  const colors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const currentPriority = PRIORITIES.find(p => p.value === priority) || PRIORITIES[1]; // Default to Medium/Normal

  const handleSelect = (val: string) => {
    onSelect(val);
    setIsOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => !disabled && setIsOpen(true)}
        style={({ pressed }) => ({
          flex: 1,
          padding: 12,
          borderRadius: 16,
          backgroundColor: colors.bg,
          borderWidth: 1,
          borderColor: priority === 'High' ? colors.danger + '40' : colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        })}
      >
        <SectionHeader title="Priority" style={{ fontSize: 10, fontWeight: '700' }} />
        
        <HStack space="xs" style={{ alignItems: 'center' }}>
          <View style={{ 
            width: 8, 
            height: 8, 
            borderRadius: 4, 
            backgroundColor: currentPriority.color,
            marginRight: 4 
          }} />
          <Text style={{ 
            fontSize: 14, 
            fontWeight: '700', 
            color: priority === 'High' ? colors.danger : colors.text,
            flex: 1 
          }}>
            {priority || 'Normal'}
          </Text>
          <I.chevronDown size={12} color={colors.sub} />
        </HStack>
      </Pressable>

      <Modal transparent visible={isOpen} animationType="fade">
        <Pressable 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }} 
          onPress={() => setIsOpen(false)}
        >
          <SafeAreaView style={{ backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <View style={{ alignItems: 'center', paddingVertical: 12 }}>
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text }}>Set Priority</Text>
            </View>

            <View style={{ paddingHorizontal: 12, paddingBottom: 30 }}>
              {PRIORITIES.map((p) => (
                <Pressable
                  key={p.value}
                  onPress={() => handleSelect(p.value)}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: priority === p.value ? p.color + '10' : pressed ? colors.bg : 'transparent',
                  })}
                >
                  <HStack space="xs" style={{ alignItems: 'center', marginBottom: 4 }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: p.color, marginRight: 12 }} />
                    <Text style={{ 
                      flex: 1, 
                      fontSize: 16, 
                      fontWeight: priority === p.value ? '700' : '500', 
                      color: colors.text 
                    }}>
                      {p.label}
                    </Text>
                    {priority === p.value && <I.check size={18} color={p.color} />}
                  </HStack>
                  
                </Pressable>
              ))}
            </View>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  );
}
