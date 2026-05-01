import React from 'react';
import { Modal, Pressable, View, type ModalProps } from 'react-native';

interface ModalWrapperProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: ModalProps['animationType'];
  /** 'center' for dialogs, 'bottom' for bottom sheets */
  position?: 'center' | 'bottom';
}

export function ModalWrapper({
  visible,
  onClose,
  children,
  animationType = 'fade',
  position = 'center',
}: ModalWrapperProps) {
  return (
    <Modal transparent animationType={animationType} visible={visible} onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: position === 'center' ? 'center' : 'flex-end',
          alignItems: position === 'center' ? 'center' : 'stretch',
        }}
        onPress={onClose}
      >
        <Pressable
          style={
            position === 'center'
              ? { paddingHorizontal: 16 }
              : undefined
          }
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
