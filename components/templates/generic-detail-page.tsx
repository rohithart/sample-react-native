import { useThemeColors } from '@/hooks/use-theme-colors';
import { useRouter } from 'expo-router';
import { MoreVertical, Edit, ArchiveRestore, Share2, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';

interface DetailPageProps {
  title: string;
  item: any;
  renderContent: (item: any) => React.ReactNode;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onShare?: (id: string) => void;
  isArchived?: boolean;
}

export function GenericDetailPage({
  title,
  item,
  renderContent,
  onEdit,
  onDelete,
  onArchive,
  onShare,
  isArchived = false,
}: DetailPageProps) {
  const { bg, card, text, sub, border, primary, warning, success, danger } = useThemeColors();
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(item._id);
    }
  };

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      setIsDeleting(true);
      await onDelete(item._id);
      setIsDeleting(false);
      setConfirmationType(null);
    }
  };

  const handleArchiveConfirm = async () => {
    if (onArchive) {
      setIsDeleting(true);
      await onArchive(item._id);
      setIsDeleting(false);
      setConfirmationType(null);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(item._id);
    }
  };

  const actions: ActionItem[] = [
    ...(onEdit
      ? [
          {
            id: 'edit',
            label: 'Edit',
            icon: <Edit size={24} color={primary} />,
            onPress: handleEdit,
            color: 'primary' as const,
          },
        ]
      : []),
    ...(onArchive
      ? [
          {
            id: 'archive',
            label: isArchived ? 'Restore' : 'Archive',
            icon: <ArchiveRestore size={24} color={warning} />,
            onPress: () => setConfirmationType('archive'),
            color: 'warning' as const,
          },
        ]
      : []),
    ...(onShare
      ? [
          {
            id: 'share',
            label: 'Share',
            icon: <Share2 size={24} color={success} />,
            onPress: handleShare,
            color: 'success' as const,
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            id: 'delete',
            label: 'Delete',
            icon: <Trash2 size={24} color={danger} />,
            onPress: () => setConfirmationType('delete'),
            color: 'danger' as const,
          },
        ]
      : []),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderBottomWidth: 1,
          borderColor: border,
          backgroundColor: card,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <Pressable onPress={() => router.back()} style={{ padding: 4 }}>
            <Text style={{ fontSize: 24, color: text }}>‹</Text>
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: text,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        <Pressable
          onPress={() => setIsBottomSheetOpen(true)}
          style={{ padding: 8 }}
        >
          <MoreVertical size={20} color={primary} />
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {renderContent(item)}
      </ScrollView>

      {/* Bottom Sheet */}
      <ActionBottomSheet
        isVisible={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        actions={actions}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={confirmationType === 'delete'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleDeleteConfirm}
        type="delete"
        isLoading={isDeleting}
      />

      {/* Archive Confirmation */}
      <ConfirmationDialog
        isOpen={confirmationType === 'archive'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleArchiveConfirm}
        type="archive"
        isLoading={isDeleting}
      />
    </SafeAreaView>
  );
}
