import { AuditInfo, DetailField, HtmlContent, LinkedField, StatusSelect, VendorRelationship } from '@/components/details';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { EntityAttachments } from '@/components/entity/entity-attachments';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityHistory } from '@/components/entity/entity-history';
import { EntityImages } from '@/components/entity/entity-images';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { PageHeader } from '@/components/ui/page-header';
import { quoteStatuses } from '@/constants/status';
import { useOrganisationContext } from '@/context/organisation-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useFlagQuote, useQuote, useUnflagQuote, useUpdateQuoteStatus } from '@/services/quote';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { resolveId } from '@/utils/resolve-ref';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';
import { convertToLocalDateTimeString } from '@/utils/date';
import { HStack } from '@/components/ui/hstack';
import { FlagButton } from '@/components/details/flag';
import { VStack } from '@/components/ui/vstack';
import { useToast } from '@/context/toast-context';

const I = ENTITY_ICONS;

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
  const { showToast } = useToast();

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useQuote(id || '');
  const updateStatus = useUpdateQuoteStatus(orgId || '');
  const flagFn = useFlagQuote(orgId || '');    
  const unflagFn = useUnflagQuote(orgId || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'Quote deleted successfully' });
    router.push(`/admin/quotes/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'Quote archived successfully' });
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/quote/${orgId}/${id}/edit`),
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
    { id: 'pdf', label: 'Download PDF', icon: <I.fileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf(EntityType.QUOTE, id || ''), color: 'success' as const },
    { id: 'timeline', label: 'Timeline', icon: <I.clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const },
    { id: 'history', label: 'History', icon: <I.history size={24} color={colors.secondary} />, onPress: () => setShowHistory(true), color: 'primary' as const },
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
      <PageHeader icon="quote"
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
        <View style={{ padding: 16, backgroundColor: colors.card, borderBottomWidth: 1, borderColor: colors.border }}>
          <StatusSelect
            statuses={quoteStatuses}
            selectedValue={item.status}
            onSelect={(status) => updateStatus.mutate({ id: id!, status })}
            disabled={!isAdmin}
          />
          <HStack space="md" style={{ marginTop: 16 }}>
            <View style={{ flex: 1, }}>
              
            </View>
            
            <View style={{ flex: 1, padding: 12, borderRadius: 16, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border }}>
              <FlagButton 
              item={item} 
              flagFn={(comment: any) => flagFn.mutate({ id: item._id, reason: comment })}
              unflagFn={() => unflagFn.mutate(item._id)}
            />
            </View>
          </HStack>
        </View>

        <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Quote Description" html={item.description} />
            </View>
          )}

          {item.vendorDescription && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Vendor Description" html={item.vendorDescription} />
            </View>
          )}

          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontSize: 13, fontWeight: '800', color: colors.sub, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
              Classification
            </Text>
            <VStack space="lg">
              <LinkedField label="Workflow" icon="workflow" value={item.workflow?.title} route={`/admin/workflow/${orgId}/${resolveId(item.workflow)}`} />
              <VendorRelationship orgId={orgId || ''} item={item} />
            </VStack>
          </View>

          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ fontSize: 13, fontWeight: '800', color: colors.sub, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
              More information
            </Text>
            <VStack space="lg">
              <DetailField label="Budget" value={item.budget != null ? '$' + Number(item.budget): null} />
              <DetailField label="Amount" value={item.amount != null ? '$' + Number(item.amount): null} />
              <DetailField label="Submitted" value={convertToLocalDateTimeString(item.submittedAt)} />
              <DetailField label="Approved" value={convertToLocalDateTimeString(item.approvedAt)} />
              <DetailField label="Approved By" value={item.approvedBy} />
            </VStack>
          </View>
        </View>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityAttachments isVisible={showAttachments} onClose={() => setShowAttachments(false)} entity={EntityType.QUOTE} entityId={id || ''} orgId={orgId || ''} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={EntityType.QUOTE} entityId={id || ''} orgId={orgId || ''} />
      <EntityImages isVisible={showImages} onClose={() => setShowImages(false)} entity={EntityType.QUOTE} entityId={id || ''} orgId={orgId || ''} />
      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={EntityType.QUOTE} entityId={id || ''} />
      <EntityHistory isVisible={showHistory} onClose={() => setShowHistory(false)} entity={EntityType.QUOTE} entityId={id || ''} />
    </SafeAreaView>
  );
}
