import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { MetadataCard } from '@/components/ui/metadata-card';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MoreVertical, ArchiveRestore, Share2, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { useOrganisationContext } from '@/context/organisation-context';
import { useAnnouncement } from '@/services/announcement';
import { useRefreshControl } from '@/hooks/use-refresh-control';

export default function AnnouncementDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | 'unarchive' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useAnnouncement(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    router.push(`/admin/announcements/${orgId}`);
  };

  const handleArchive = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Announcement archived successfully');
  };

  const handleUnarchive = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Announcement unarchived successfully');
  };

  const actions: ActionItem[] = [

    ...(isAdmin ? [item?.status === 'archived' ? {
      id: 'unarchive',
      label: 'Unarchive',
      icon: <ArchiveRestore size={24} color={colors.success} />,
      onPress: () => setConfirmationType('unarchive'),
      color: 'success' as const,
    } : {
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
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
      <PageHeader
        title={item?.name || 'Loading...'}
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBadge status={item.status} />

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>Description</Text>
          <Text style={{ fontSize: 14, color: colors.sub, lineHeight: 20 }}>{item.description}</Text>
        </View>

        <MetadataCard
          rows={[
            { label: 'Owner', value: item.metadata?.owner || 'N/A' },
            { label: 'Priority', value: item.metadata?.priority || 'N/A' },
            { label: 'Created', value: new Date(item.createdAt).toLocaleDateString() },
            { label: 'Updated', value: new Date(item.updatedAt).toLocaleDateString() },
          ]}
        />

      </ScrollView>
      )}

      <ActionBottomSheet
        isVisible={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        actions={actions}
      />
      <ConfirmationDialog
        isOpen={confirmationType === 'delete'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleDelete}
        type="delete"
        isLoading={isLoading}
      />
      <ConfirmationDialog
        isOpen={confirmationType === 'archive'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleArchive}
        type="archive"
        isLoading={isLoading}
      />
      <ConfirmationDialog
        isOpen={confirmationType === 'unarchive'}
        onClose={() => setConfirmationType(null)}
        onConfirm={handleUnarchive}
        type="archive"
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
