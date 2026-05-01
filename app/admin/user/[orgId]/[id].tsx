import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { useOrganisation } from '@/context/organisation-context';

import { useUser } from '@/services/user';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { useToast } from '@/context/toast-context';
import { SectionHeader } from '@/components/section-header';
import { LoadingState } from '@/components/ui/loading-state';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

export default function UserDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const { showToast } = useToast();

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useUser(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'User deleted successfully' });
    router.push(`/admin/users/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'User archived successfully' });
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/user/${orgId}/${id}/edit`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <I.archiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),

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
      <PageHeader icon="user"
        title={item?.user?.name || item?.user?.email || 'User' || 'Loading...'}
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
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={{ padding: 16, gap: 20 }}>
          <Box className="items-center mb-8">
            {item?.user?.image ? (
              <Box
                className="w-24 h-24 rounded-full items-center justify-center mb-4 overflow-hidden"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Image
                  source={{ uri: item.user.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </Box>
            ) : (
              <Box
                className="w-24 h-24 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                <Text className="text-5xl">👤</Text>
              </Box>
            )}
          </Box>

          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="User information" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
               <DetailField label="Name" value={item.user?.name} />
              <DetailField label="Email" value={item.user?.email} />
              <DetailField label="Phone" value={item.user?.phone} />
              <DetailField label="Address" value={item.user?.address} />
            </VStack>
          </View>

          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Role" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Role" value={item.role} />
              {isAdmin && (
                <DetailField label="Description" value={item.description} />
              )}
              {isAdmin && (
                <DetailField label="Reference" value={item.reference} />
              )}
              <DetailField label="Archived" value={item.archived ? 'Yes' : 'No'} />
            </VStack>
          </View>
        </View>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />

    </SafeAreaView>
  );
}
