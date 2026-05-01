import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams } from 'expo-router';

import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { useGroup } from '@/services/group';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { GroupChat } from '@/components/chat/group-chat';
import { LoadingList } from '@/components/skeleton';
import { Pressable } from '@/components/ui/pressable';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

export default function ChatScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const { data: item, isLoading: isLoadingItem} = useGroup(id || '');

  const actions: ActionItem[] = [
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="group"
        title={item?.title || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8, backgroundColor: colors.primary + '10', borderRadius: 12 }}>
            <I.moreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoadingItem || !item ? (
        <LoadingList />
      ) : (
        <View style={{ flex: 1 }}>
          <GroupChat groupId={id || ''} orgId={orgId || ''} group={item} />
        </View>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
    </SafeAreaView>
  );
}
