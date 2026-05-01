import { AuditInfo } from '@/components/details';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { EntityAttachments } from '@/components/entity/entity-attachments';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityHistory } from '@/components/entity/entity-history';
import { EntityImages } from '@/components/entity/entity-images';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { LoadingPage } from '@/components/skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { ENTITY_ICONS, type EntityIconKey } from '@/constants/entity-icons';
import { useOrganisation } from '@/context/organisation-context';
import { useToast } from '@/context/toast-context';
import type { EntityType } from '@/enums';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { type ActionItem } from '@/types/actionItem';
import { convertToRelativeTime } from '@/utils/date';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const I = ENTITY_ICONS;

interface DetailScreenShellProps {
  icon: EntityIconKey;
  title: string;
  isLoading: boolean;
  item?: any;
  refreshControl?: any;
  children: React.ReactNode | ((item: any) => React.ReactNode);
  /** Route for the edit page. If set, enables admin actions (edit/archive/delete) gated by isAdmin. */
  editRoute?: string;
  /** Route to navigate after delete. Required if editRoute is set. */
  deleteRedirectRoute?: string;
  /** Entity display name for toast messages (e.g. "Workflow"). */
  entityName?: string;
  /** Extra custom actions (pdf, share, etc.) inserted between archive and features. */
  extraActions?: ActionItem[];
  /** For entity sub-features (attachments, comments, etc.) */
  entityType?: EntityType;
  entityId?: string;
  orgId?: string;
  features?: ('attachments' | 'comments' | 'images' | 'timeline' | 'history')[];
  /** Timestamp (ms) from React Query's dataUpdatedAt for "Updated X ago" display. */
  dataUpdatedAt?: number;
}

export function DetailScreenShell({
  icon,
  title,
  isLoading,
  item,
  refreshControl,
  children,
  editRoute,
  deleteRedirectRoute,
  entityName,
  extraActions = [],
  entityType,
  entityId,
  orgId,
  features = [],
  dataUpdatedAt,
}: DetailScreenShellProps) {
  const colors = useThemeColors();
  const router = useRouter();
  const { showToast } = useToast();
  const { isAdmin } = useOrganisation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: `${entityName} deleted successfully` });
    if (deleteRedirectRoute) router.push(deleteRedirectRoute as any);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: `${entityName} archived successfully` });
  };

  const actions: ActionItem[] = [
    // Admin: Edit
    ...(editRoute && isAdmin ? [{
      id: 'edit', label: 'Edit', icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(editRoute as any), color: 'primary' as const,
    }] : []),
    // Admin: Archive
    ...(editRoute && isAdmin ? [{
      id: 'archive', label: 'Archive', icon: <I.archiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'), color: 'warning' as const,
    }] : []),
    // Extra actions (pdf, share, etc.)
    ...extraActions,
    // Features
    ...(features.includes('attachments') ? [{
      id: 'attachments', label: 'Attachments', icon: <I.attachment size={24} color={colors.primary} />, onPress: () => setShowAttachments(true), color: 'primary' as const,
    }] : []),
    ...(features.includes('comments') ? [{
      id: 'comments', label: 'Comments', icon: <I.comment size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const,
    }] : []),
    ...(features.includes('images') ? [{
      id: 'images', label: 'Images', icon: <I.gallery size={24} color={colors.primary} />, onPress: () => setShowImages(true), color: 'primary' as const,
    }] : []),
    ...(features.includes('timeline') ? [{
      id: 'timeline', label: 'Timeline', icon: <I.clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const,
    }] : []),
    ...(features.includes('history') ? [{
      id: 'history', label: 'History', icon: <I.history size={24} color={colors.secondary} />, onPress: () => setShowHistory(true), color: 'primary' as const,
    }] : []),
    // Audit (always)
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    // Admin: Delete
    ...(editRoute && isAdmin ? [{
      id: 'delete', label: 'Delete', icon: <I.trash size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'), color: 'danger' as const,
    }] : []),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        icon={icon}
        title={title}
        subtitle={dataUpdatedAt ? `Updated ${convertToRelativeTime(dataUpdatedAt)}` : undefined}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8, backgroundColor: colors.primary + '10', borderRadius: 12 }}>
            <I.moreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      {isLoading || !item ? (
        <LoadingPage />
      ) : (
        <ScrollView
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {typeof children === 'function' ? children(item) : children}
        </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      {editRoute && (
        <>
          <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
          <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
        </>
      )}
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      {features.includes('attachments') && entityType && (
        <EntityAttachments isVisible={showAttachments} onClose={() => setShowAttachments(false)} entity={entityType} entityId={entityId || ''} orgId={orgId || ''} />
      )}
      {features.includes('comments') && entityType && (
        <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={entityType} entityId={entityId || ''} orgId={orgId || ''} />
      )}
      {features.includes('images') && entityType && (
        <EntityImages isVisible={showImages} onClose={() => setShowImages(false)} entity={entityType} entityId={entityId || ''} orgId={orgId || ''} />
      )}
      {features.includes('timeline') && entityType && (
        <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={entityType} entityId={entityId || ''} />
      )}
      {features.includes('history') && entityType && (
        <EntityHistory isVisible={showHistory} onClose={() => setShowHistory(false)} entity={entityType} entityId={entityId || ''} />
      )}
    </SafeAreaView>
  );
}
