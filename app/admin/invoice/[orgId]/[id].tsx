import { AuditInfo, DetailField, DetailSection, HtmlContent, LinkedField, StatusSelect, VendorRelationship } from '@/components/details';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { EntityAttachments } from '@/components/entity/entity-attachments';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityHistory } from '@/components/entity/entity-history';
import { EntityImages } from '@/components/entity/entity-images';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { PageHeader } from '@/components/ui/page-header';
import { invoiceStatuses } from '@/constants/status';
import { useOrganisationContext } from '@/context/organisation-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useInvoice, useUpdateInvoiceStatus } from '@/services/invoice';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { resolveId } from '@/utils/resolve-ref';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';

const I = ENTITY_ICONS;

function fmt(d: string | Date | undefined | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }

export default function InvoiceDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useInvoice(id || '');
  const updateStatus = useUpdateInvoiceStatus(orgId || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    router.push(`/admin/invoices/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Invoice archived successfully');
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/invoice/${orgId}/${id}/edit`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <I.archiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
    { id: 'attachments', label: 'Attachments', icon: <I.attachment size={24} color={colors.primary} />, onPress: () => setShowAttachments(true), color: 'primary' as const },
    { id: 'comments', label: 'Comments', icon: <I.comment size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const },
    { id: 'images', label: 'Images', icon: <I.gallery size={24} color={colors.primary} />, onPress: () => setShowImages(true), color: 'primary' as const },
    { id: 'pdf', label: 'Download PDF', icon: <I.fileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf('invoice', id || ''), color: 'success' as const },
    { id: 'timeline', label: 'Timeline', icon: <I.clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const },
    { id: 'history', label: 'History', icon: <I.history size={24} color={colors.secondary} />, onPress: () => setShowHistory(true), color: 'primary' as const },
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    {
      id: 'share',
      label: 'Share',
      icon: <I.share size={24} color={colors.success} />,
      onPress: () => Alert.alert('Share', 'Share functionality coming soon'),
      color: 'success' as const,
    },
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
      <PageHeader icon="invoice"
        title={item?.title || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8 }}>
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        <StatusSelect
          statuses={invoiceStatuses}
          selectedValue={item.status}
          onSelect={(status) => updateStatus.mutate({ id: id!, status })}
          disabled={!isAdmin}
        />
        {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
        <DetailSection title="Financial">
          <DetailField label="Total Amount" value={item.totalAmount != null ? '$' + Number(item.totalAmount).toLocaleString() : null} />
          <DetailField label="Is Expense" value={item.isExpense ? 'Yes' : 'No'} />
          <DetailField label="Due Date" value={fmt(item.dueDate)} />
          <DetailField label="Paid At" value={fmt(item.paidAt)} />
          <DetailField label="Link" value={item.link} />
        </DetailSection>
        <DetailSection title="Details">
          <DetailField label="Archived" value={item.archived ? 'Yes' : 'No'} />
          <DetailField label="Flagged" value={item.isFlagged ? 'Yes' : 'No'} />
        </DetailSection>
        <DetailSection title="Relationships">
          <VendorRelationship orgId={orgId || ''} item={item} />
          <LinkedField label="Quote" icon="quote" value={item.quote?.title} route={`/admin/quote/${orgId}/${resolveId(item.quote)}`} />
          <LinkedField label="Work Order" icon="workorder" value={item.workorder?.title} route={`/admin/workorder/${orgId}/${resolveId(item.workorder)}`} />
          <LinkedField label="Workflow" icon="workflow" value={item.workflow?.title} route={`/admin/workflow/${orgId}/${resolveId(item.workflow)}`} />
          <LinkedField label="Transaction" icon="financialYear" value={item.transaction?.description}  />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityAttachments isVisible={showAttachments} onClose={() => setShowAttachments(false)} entity={EntityType.INVOICE} entityId={id || ''} orgId={orgId || ''} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={EntityType.INVOICE} entityId={id || ''} orgId={orgId || ''} />
      <EntityImages isVisible={showImages} onClose={() => setShowImages(false)} entity={EntityType.INVOICE} entityId={id || ''} orgId={orgId || ''} />
      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={EntityType.INVOICE} entityId={id || ''} />
      <EntityHistory isVisible={showHistory} onClose={() => setShowHistory(false)} entity={EntityType.INVOICE} entityId={id || ''} />
    </SafeAreaView>
  );
}
