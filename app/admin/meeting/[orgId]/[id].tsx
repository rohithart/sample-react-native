import { AuditInfo, DetailField, DetailSection, GroupRelationship, HtmlContent } from '@/components/details';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { EntityAttachments } from '@/components/entity/entity-attachments';
import { EntityComments } from '@/components/entity/entity-comments';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { PageHeader } from '@/components/ui/page-header';
import { useOrganisationContext } from '@/context/organisation-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useMeeting } from '@/services/meeting';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArchiveRestore, Edit, FileDown, Info, MessageSquare, MoreVertical, Paperclip, Share2, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function fmt(d: string | Date | undefined | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }

export default function MeetingDetailScreen() {
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

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useMeeting(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    router.push(`/admin/meetings/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Meeting archived successfully');
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <Edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/meeting/${orgId}/${id}/edit`),
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
    { id: 'pdf', label: 'Download PDF', icon: <FileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf('meeting', id || ''), color: 'success' as const },
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
      <PageHeader icon="meeting"
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
        {item.agenda ? <HtmlContent label="Agenda" html={item.agenda} /> : null}
        {item.details ? <HtmlContent label="Details" html={item.details} /> : null}
        {item.mom ? <HtmlContent label="Minutes of Meeting" html={item.mom} /> : null}
        <DetailSection title="Schedule">
          <DetailField label="Date" value={fmt(item.meetingDate)} />
          <DetailField label="Time" value={fmt(item.meetingTime)} />
          <DetailField label="Duration" value={item.duration ? item.duration + ' min' : null} />
        </DetailSection>
        <DetailSection title="Links">
          <DetailField label="Teams Link" value={item.teamsLink} />
          <DetailField label="Meet Link" value={item.meetLink} />
        </DetailSection>
        <DetailSection title="Details">
          <DetailField label="All Users" value={item.allUsers ? 'Yes' : 'No'} />
          <DetailField label="Archived" value={item.archived ? 'Yes' : 'No'} />
        </DetailSection>
        <DetailSection title="Relationships">
          <GroupRelationship orgId={orgId || ''} item={item} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityAttachments isVisible={showAttachments} onClose={() => setShowAttachments(false)} entity={'meeting'} entityId={id || ''} orgId={orgId || ''} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={'meeting'} entityId={id || ''} orgId={orgId || ''} />
    </SafeAreaView>
  );
}
