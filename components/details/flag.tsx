import React, { useState } from 'react';
import { Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { HStack } from '../ui/hstack';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { SectionHeader } from '../section-header';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

export function FlagButton({ item, flagFn, unflagFn }: any) {
  const colors = useThemeColors();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');

  const handlePress = () => {
    if (item.isFlagged) {
      Alert.alert('Remove Flag', 'Remove the flag from this item?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: unflagFn },
      ]);
    } else {
      setShowModal(true);
    }
  };

  const submitFlag = () => {
    flagFn(comment || 'No reason provided');
    setComment('');
    setShowModal(false);
  };

  return (
    <>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => ({
          flex: 1,
          padding: 12,
          borderRadius: 16,
          backgroundColor: item.isFlagged ? colors.dangerBg : colors.bg,
          borderWidth: 1,
          borderColor: item.isFlagged ? colors.danger : colors.border,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <SectionHeader title="Flag" style={{ fontSize: 10, fontWeight: '700', color: item.isFlagged ? colors.danger : colors.sub }} />
        <HStack space="xs" style={{ alignItems: 'center' }}>
          <I.flag size={14} color={item.isFlagged ? colors.danger : colors.sub}  />
          <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '700', color: item.isFlagged ? colors.danger : colors.text, flex: 1 }}>
            {item.isFlagged ? (item.flagComment || 'Flagged') : 'Not flagged'}
          </Text>
        </HStack>
      </Pressable>

      <Modal visible={showModal} transparent animationType="fade">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}
        >
          <View style={{ backgroundColor: colors.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 8 }}>Flag Item</Text>
            <Text style={{ fontSize: 14, color: colors.sub, marginBottom: 16 }}>Provide a reason for flagging this item:</Text>
            
            <TextInput
              autoFocus
              value={comment}
              onChangeText={setComment}
              placeholder="e.g. Inappropriate content..."
              placeholderTextColor={colors.sub}
              style={{ 
                backgroundColor: colors.bg, 
                borderRadius: 12, 
                padding: 12, 
                color: colors.text, 
                borderWidth: 1, 
                borderColor: colors.border,
                minHeight: 80,
                textAlignVertical: 'top'
              }}
              multiline
            />

            <HStack space="md" style={{ marginTop: 20 }}>
              <Pressable 
                onPress={() => { setShowModal(false); setComment(''); }}
                style={{ flex: 1, padding: 12, alignItems: 'center', borderRadius: 12, backgroundColor: colors.bg }}
              >
                <Text style={{ color: colors.text, fontWeight: '600' }}>Cancel</Text>
              </Pressable>
              <Pressable 
                onPress={submitFlag}
                style={{ flex: 1, padding: 12, alignItems: 'center', borderRadius: 12, backgroundColor: colors.danger }}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>Flag Item</Text>
              </Pressable>
            </HStack>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
