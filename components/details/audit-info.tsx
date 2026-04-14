import { useThemeColors } from '@/hooks/use-theme-colors';
import { Calendar, RefreshCw, User, X } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AuditInfoProps {
  isVisible: boolean;
  onClose: () => void;
  createdBy?: string;
  updatedBy?: string;
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

export function AuditInfo({ isVisible, onClose, createdBy, updatedBy, createdAt, updatedAt }: AuditInfoProps) {
  const { bg, card, text, sub, border, primary, secondary } = useThemeColors();
  const { top, bottom } = useSafeAreaInsets();

  if (!isVisible) return null;

  const rows: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <User size={16} color={primary} />, label: 'Created by', value: createdBy || '—' },
    { icon: <Calendar size={16} color={primary} />, label: 'Created at', value: formatDate(createdAt) },
    { icon: <User size={16} color={secondary} />, label: 'Updated by', value: updatedBy || '—' },
    { icon: <RefreshCw size={16} color={secondary} />, label: 'Updated at', value: formatDate(updatedAt) },
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
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
              borderBottomWidth: 1,
              borderColor: border,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: text }}>Audit Information</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <X size={20} color={sub} />
            </Pressable>
          </View>

          {/* Body */}
          <View style={{ padding: 16, gap: 12 }}>
            {rows.map((row, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
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
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, color: sub }}>{row.label}</Text>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: text }} numberOfLines={1}>
                    {row.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
