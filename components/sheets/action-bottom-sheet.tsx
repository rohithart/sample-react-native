import { HStack } from '@/components/ui/hstack';
import { IconButton } from '@/components/ui/icon-button';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React, { useState } from 'react';
import { Animated, Modal, Pressable, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

interface ActionBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  actions: ActionItem[];
}

export function ActionBottomSheet({
  isVisible,
  onClose,
  actions,
}: ActionBottomSheetProps) {
  const { card, border } = useThemeColors();
  const { bottom } = useSafeAreaInsets();
  const [slideAnim] = useState(new Animated.Value(300));

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  // Split actions into rows of 3
  const rows: ActionItem[][] = [];
  for (let i = 0; i < actions.length; i += 3) {
    rows.push(actions.slice(i, i + 3));
  }

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onPress={onClose}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Pressable>
            <SafeAreaView
              style={{
                backgroundColor: card,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingTop: 12,
                paddingHorizontal: 8,
              }}
            >
              {/* Handle Bar */}
              <View style={{ alignItems: 'center', marginBottom: 16 }}>
                <View
                  style={{
                    width: 40,
                    height: 4,
                    backgroundColor: border,
                    borderRadius: 2,
                  }}
                />
              </View>

              {/* Actions Grid - 3 items per row */}
              {rows.map((row, rowIndex) => (
                <HStack
                  key={rowIndex}
                  className="justify-around items-center"
                  style={{
                    paddingHorizontal: 4,
                    paddingBottom: 8,
                  }}
                >
                  {row.map((action) => (
                    <View
                      key={action.id}
                      style={{
                        flex: 1,
                        maxWidth: '33.33%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconButton
                        icon={action.icon}
                        text={action.label}
                        onPress={() => {
                          action.onPress();
                          onClose();
                        }}
                        color={action.color}
                        disabled={action.disabled}
                      />
                    </View>
                  ))}
                </HStack>
              ))}

              {/* Spacer */}
              <View style={{ height: bottom + 16 }} />
            </SafeAreaView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
