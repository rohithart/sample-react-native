import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, DetailSection, HtmlContent, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { useOrganisationContext } from '@/context/organisation-context';

import { useChartOfAccount } from '@/services/chart-of-account';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';

const I = ENTITY_ICONS;

export default function ChartofAccountDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useChartOfAccount(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    router.push(`/admin/chart-of-accounts/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Chart of Account archived successfully');
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/coa/${orgId}/${id}/edit`),
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
      <PageHeader icon="chartOfAccount"
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
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
        <DetailSection title="Account">
          <DetailField label="Code" value={item.code} />
          <DetailField label="Account Type" value={item.accountType} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />

    </SafeAreaView>
  );
}
