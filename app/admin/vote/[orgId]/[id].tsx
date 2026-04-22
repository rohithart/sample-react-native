import { AuditInfo, DetailField, DetailSection, GroupRelationship, LinkedField } from '@/components/details';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { PageHeader } from '@/components/ui/page-header';
import { useOrganisationContext } from '@/context/organisation-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useVote } from '@/services/vote';
import { resolveId } from '@/utils/resolve-ref';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';
import { convertToLocalDateTimeString } from '@/utils/date';

const I = ENTITY_ICONS;

export default function VoteDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useVote(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    router.push(`/admin/votes/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Vote archived successfully');
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/vote/${orgId}/${id}/edit`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <I.archiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
    { id: 'timeline', label: 'Timeline', icon: <I.clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const },
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    ...(isAdmin ? [{
      id: 'delete',
      label: 'Delete',
      icon: <I.trash size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger' as const,
    }] : []),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="vote"
        title={item?.question || 'Loading...'}
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
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <DetailSection title="Details">
          <DetailField label="Options" value={item.options} />
          <DetailField label="Status" value={item.closed ? 'Closed' : 'Open'} />
          <DetailField label="All Users" value={item.allUsers ? 'Yes' : 'No'} />
          <DetailField label="End Date" value={convertToLocalDateTimeString(item.endDate)} />
        </DetailSection>
        <DetailSection title="Relationships">
          <GroupRelationship orgId={orgId || ''} item={item} />
          <LinkedField label="Workflow" icon="workflow" value={item.workflow?.title} route={`/admin/workflow/${orgId}/${resolveId(item.workflow)}`} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={EntityType.VOTE} entityId={id || ''} />
    </SafeAreaView>
  );
}
