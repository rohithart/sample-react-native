import { useThemeColors } from '@/hooks/use-theme-colors';
import { ActionItem } from '@/types/actionItem';
import React, { useState } from 'react';
import { Animated, Modal, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Matrix } from '../matrix';
import { Pressable } from '@/components/ui/pressable';

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

  const rows: ActionItem[][] = [];
  for (let i = 0; i < actions.length; i += 4) {
    rows.push(actions.slice(i, i + 4));
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

              {rows.map((row, rowIndex) => (
                <Matrix key={rowIndex} row={row} index={rowIndex} onClose={onClose} />
              ))}

              <View style={{ height: bottom + 16 }} />
            </SafeAreaView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
