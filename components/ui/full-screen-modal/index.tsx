import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

interface FullScreenModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  count?: number;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

export function FullScreenModal({ visible, onClose, title, count, headerRight, children }: FullScreenModalProps) {
  const colors = useThemeColors();

  if (!visible) return null;

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
        <HStack
          className="items-center justify-between"
          style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border }}
        >
          <HStack space="sm" className="items-center">
            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>{title}</Text>
            {count != null && count > 0 && (
              <View style={{ backgroundColor: colors.primary + '15', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>{count}</Text>
              </View>
            )}
          </HStack>
          <HStack space="md" className="items-center">
            {headerRight}
            <Pressable onPress={onClose} style={{ padding: 4 }}>
              <I.close size={22} color={colors.sub} />
            </Pressable>
          </HStack>
        </HStack>
        {children}
      </SafeAreaView>
    </Modal>
  );
}
