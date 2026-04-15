import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { DetailField, DetailSection, LinkedField, HtmlContent, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MoreVertical, Edit, ArchiveRestore, Share2, Trash2, Info, Paperclip, MessageSquare, ImageIcon, FileDown, Clock, History } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { useOrganisationContext } from '@/context/organisation-context';
import { EntityAttachments } from '@/components/entity/entity-attachments';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityImages } from '@/components/entity/entity-images';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { EntityHistory } from '@/components/entity/entity-history';
import { useQuote } from '@/services/quote';
import { useRefreshControl } from '@/hooks/use-refresh-control';

function fmt(d: string | Date | undefined | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }

export default function QuoteDetailScreen() {
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

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useQuote(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    router.push(`/admin/quotes/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Quote archived successfully');
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <Edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/quote/${orgId}/${id}/edit`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
    { id: 'attachments', label: 'Attachments', icon: <Paperclip size={24} color={colors.primary} />, onPress: () => setShowAttachments(true), color: 'primary' as const },
    { id: 'comments', label: 'Comments', icon: <MessageSquare size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const },
    { id: 'images', label: 'Images', icon: <ImageIcon size={24} color={colors.primary} />, onPress: () => setShowImages(true), color: 'primary' as const },
    { id: 'pdf', label: 'Download PDF', icon: <FileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf('quote', id || ''), color: 'success' as const },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const },
    { id: 'history', label: 'History', icon: <History size={24} color={colors.secondary} />, onPress: () => setShowHistory(true), color: 'primary' as const },
    { id: 'audit', label: 'Audit Info', icon: <Info size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 size={24} color={colors.success} />,
      onPress: () => Alert.alert('Share', 'Share functionality coming soon'),
      color: 'success' as const,
    },
    ...(isAdmin ? [{
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger' as const,
    }] : []),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="quote"
        title={item?.title || item?.title || item?.name || 'Loading...'}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8 }}>
            <MoreVertical size={20} color={colors.primary} />
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
        <StatusBadge status={item.status} />
        {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
        {item.vendorDescription ? <HtmlContent label="Vendor Description" html={item.vendorDescription} /> : null}
        <DetailSection title="Financial">
          <DetailField label="Budget" value={item.budget != null ? '$' + Number(item.budget).toLocaleString() : null} />
          <DetailField label="Amount" value={item.amount != null ? '$' + Number(item.amount).toLocaleString() : null} />
          <DetailField label="Submitted" value={fmt(item.submittedAt)} />
          <DetailField label="Approved" value={fmt(item.approvedAt)} />
          <DetailField label="Approved By" value={item.approvedBy} />
        </DetailSection>
        <DetailSection title="Details">
          <DetailField label="Archived" value={item.archived ? 'Yes' : 'No'} />
          <DetailField label="Flagged" value={item.isFlagged ? 'Yes' : 'No'} />
        </DetailSection>
        <DetailSection title="Relationships">
          <LinkedField label="Vendor" icon="vendor" value={item.vendor?.name} route={`/admin/vendor/${orgId}/${item.vendor?._id}`} />
          <LinkedField label="Workflow" icon="workflow" value={item.workflow?.title} route={`/admin/workflow/${orgId}/${item.workflow?._id}`} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityAttachments isVisible={showAttachments} onClose={() => setShowAttachments(false)} entity={'quote'} entityId={id || ''} orgId={orgId || ''} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={'quote'} entityId={id || ''} orgId={orgId || ''} />
      <EntityImages isVisible={showImages} onClose={() => setShowImages(false)} entity={'quote'} entityId={id || ''} orgId={orgId || ''} />
      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={'quote'} entityId={id || ''} />
      <EntityHistory isVisible={showHistory} onClose={() => setShowHistory(false)} entity={'quote'} entityId={id || ''} />
    </SafeAreaView>
  );
}
