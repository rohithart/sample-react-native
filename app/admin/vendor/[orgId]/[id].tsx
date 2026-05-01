import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, DetailSection, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { useOrganisation } from '@/context/organisation-context';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { useVendor } from '@/services/vendor';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';
import { useToast } from '@/context/toast-context';
import { LoadingState } from '@/components/ui/loading-state';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';

const I = ENTITY_ICONS;

export default function VendorDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const { showToast } = useToast();

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useVendor(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'Vendor deleted successfully' });
    router.push(`/admin/vendors/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'Vendor archived successfully' });
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/vendor/${orgId}/${id}/edit`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <I.archiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
    { id: 'comments', label: 'Comments', icon: <I.comment size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const },
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
      <PageHeader icon="vendor"
        title={item?.name || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8, backgroundColor: colors.primary + '10', borderRadius: 12 }}>
            <I.moreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoadingItem || !item ? (
        <LoadingState />
      ) : (
      <ScrollView
        refreshControl={refreshControl}
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <DetailSection title="Contact">
          <DetailField label="Email" value={item.email} />
          <DetailField label="Contact Person" value={item.contactPerson} />
          <DetailField label="Contact Number" value={item.contactNumber} />
          <DetailField label="Address" value={item.address} />
        </DetailSection>
        <DetailSection title="Business">
          <DetailField label="Tax Number" value={item.tax} />
          <DetailField label="Reference" value={item.ref} />
          <DetailField label="Archived" value={item.archived ? 'Yes' : 'No'} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={EntityType.VENDOR} entityId={id || ''} orgId={orgId || ''} />
      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={EntityType.VENDOR} entityId={id || ''} />
    </SafeAreaView>
  );
}
