import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { useThemeColors } from '@/hooks/use-theme-colors';

import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

interface AuditInfoProps {
  isVisible: boolean;
  onClose: () => void;
  createdBy?: unknown;
  updatedBy?: unknown;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

function formatDate(d?: string | Date): string {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Safely resolve a user ref that may be a string name, a I.user object, or nullish */
function resolveUserName(ref: unknown): string {
  if (!ref) return '—';
  if (typeof ref === 'string') return ref;
  if (typeof ref === 'object' && ref !== null) {
    const obj = ref as Record<string, unknown>;
    if (typeof obj.name === 'string' && obj.name) return obj.name;
    if (typeof obj.email === 'string' && obj.email) return obj.email;
  }
  return '—';
}

export function AuditInfo({ isVisible, onClose, createdBy, updatedBy, createdAt, updatedAt }: AuditInfoProps) {
  const { bg, card, text, sub, border, primary, secondary } = useThemeColors();
  const { top, bottom } = useSafeAreaInsets();

  if (!isVisible) return null;

  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <I.user size={16} color={primary} />, label: 'Created by', value: resolveUserName(createdBy) },
    { icon: <I.calendar size={16} color={primary} />, label: 'Created at', value: formatDate(createdAt) },
    { icon: <I.user size={16} color={secondary} />, label: 'Updated by', value: resolveUserName(updatedBy) },
    { icon: <I.refresh size={16} color={secondary} />, label: 'Updated at', value: formatDate(updatedAt) },
  ];

  return (
    <Modal transparent animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
        onPress={onClose}
      >
        <Pressable
          style={{
            width: '85%',
            backgroundColor: card,
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <HStack
            className="items-center justify-between"
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderColor: border,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: text }}>Audit Information</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <I.close size={20} color={sub} />
            </Pressable>
          </HStack>

          <VStack space="md" style={{ padding: 16 }}>
            {rows.map((row, idx) => (
              <HStack
                key={idx}
                space="md"
                className="items-center"
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  backgroundColor: bg,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: border,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: (idx < 2 ? primary : secondary) + '15',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {row.icon}
                </View>
                <VStack className="flex-1">
                  <Text style={{ fontSize: 11, color: sub }}>{row.label}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: text }} numberOfLines={1}>
                    {row.value}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
