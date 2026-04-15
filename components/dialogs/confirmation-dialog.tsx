import { HStack } from '@/components/ui/hstack';
import { useThemeColors } from '@/hooks/use-theme-colors';

import React from 'react';
import {
    Modal,
    Pressable,
    Text,
    View,
} from 'react-native';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

type DialogType = 'delete' | 'archive' | 'custom';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: DialogType;
  title?: string;
  message?: string;
  confirmText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
}

const defaultTexts = {
  delete: {
    title: 'Delete Item',
    message: 'This action cannot be reversed. The item will be permanently deleted.',
    confirmText: 'Delete',
    isDangerous: true,
  },
  archive: {
    title: 'Archive Item',
    message: 'You can restore this item from archived items later.',
    confirmText: 'Archive',
    isDangerous: false,
  },
  custom: {
    title: 'Confirm',
    message: 'Are you sure?',
    confirmText: 'Confirm',
    isDangerous: false,
  },
};

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  message,
  confirmText,
  isDangerous: customDangerous,
  isLoading = false,
}: ConfirmationDialogProps) {
  const { card: bg, text, sub, border, primary, danger, pressed: pressedBg } = useThemeColors();
  const config = defaultTexts[type];

  const finalTitle = title || config.title;
  const finalMessage = message || config.message;
  const finalConfirmText = confirmText || config.confirmText;
  const isDangerous = customDangerous !== undefined ? customDangerous : config.isDangerous;

  const actionColor = isDangerous ? danger : primary;

  return (
    <Modal transparent animationType="fade" visible={isOpen} onRequestClose={onClose}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onPress={onClose}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
          }}
        >
          <Pressable
            style={{
              backgroundColor: bg,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: border,
              paddingTop: 16,
              paddingBottom: 12,
              minWidth: '80%',
              maxWidth: 320,
            }}
          >
            {/* Header */}
            <HStack
              className="items-center justify-between"
              style={{
                paddingHorizontal: 16,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderColor: border,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: text,
                  flex: 1,
                }}
              >
                {finalTitle}
              </Text>
              <Pressable onPress={onClose} style={{ padding: 4, marginLeft: 8 }}>
                <I.close size={20} color={sub} />
              </Pressable>
            </HStack>

            {/* Message */}
            <Text
              style={{
                fontSize: 14,
                color: sub,
                marginHorizontal: 16,
                marginTop: 12,
                lineHeight: 20,
              }}
            >
              {finalMessage}
            </Text>

            {/* Buttons */}
            <HStack
              space="sm"
              style={{
                marginTop: 16,
                paddingHorizontal: 16,
              }}
            >
              <Pressable
                onPress={onClose}
                disabled={isLoading}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: border,
                  backgroundColor: pressedBg,
                  alignItems: 'center',
                  opacity: pressed || isLoading ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <Text style={{ fontSize: 14, fontWeight: '700', color: text }}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={onConfirm}
                disabled={isLoading}
                style={({ pressed }) => ({
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  backgroundColor: actionColor,
                  alignItems: 'center',
                  opacity: pressed || isLoading ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#ffffff' }}>
                  {isLoading ? '...' : finalConfirmText}
                </Text>
              </Pressable>
            </HStack>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
