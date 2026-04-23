import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, HtmlContent, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { useUserRequest } from '@/services/user-request';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityType } from '@/enums';
import { VStack } from '@/components/ui/vstack';

const I = ENTITY_ICONS;

export default function UserRequestDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useUserRequest(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const actions: ActionItem[] = [
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    { id: 'comments', label: 'Comments', icon: <I.comment size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="userRequest"
        title={item?.title || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8, backgroundColor: colors.primary + '10', borderRadius: 12 }}>
            <I.moreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoadingItem || !item ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.sub, fontSize: 14, marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
      <ScrollView
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Description" html={item.description} />
            </View>
          )}

          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontSize: 13, fontWeight: '800', color: colors.sub, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
              More information
            </Text>
            <VStack space="lg">
              <DetailField label="Approved" value={item.isApproved ? 'Yes' : 'No'} />
              <DetailField label="Approved By" value={item.approvedBy} />
              <DetailField label="Rejected" value={item.isRejected ? 'Yes' : 'No'} />
              <DetailField label="Rejected By" value={item.rejectedBy} />
            </VStack>
          </View>
        </View>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={EntityType.USER_REQUEST} entityId={id || ''} orgId={orgId || ''} />
    </SafeAreaView>
  );
}
