import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { MetadataCard } from '@/components/ui/metadata-card';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MoreVertical, Edit, ArchiveRestore, Share2, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet, ActionItem } from '@/components/sheets/action-bottom-sheet';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { generateDummyItemWithDetails } from '@/utils/dummy-data';

export default function EventTypeDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const item = generateDummyItemWithDetails(id || '1');

  const handleDelete = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    router.push(`/admin/event-types/${orgId}`);
  };

  const handleArchive = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setConfirmationType(null);
    Alert.alert('Success', 'Event Type archived successfully');
  };

  const actions: ActionItem[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/event-type/${orgId}/${id}/edit`),
      color: 'primary',
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: <ArchiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning',
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 size={24} color={colors.success} />,
      onPress: () => Alert.alert('Share', 'Share functionality coming soon'),
      color: 'success',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={24} color={colors.danger} />,
      onPress: () => setConfirmationType('delete'),
      color: 'danger',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        title={item.name}
        rightAction={
          <Pressable onPress={() => setIsBottomSheetOpen(true)} style={{ padding: 8 }}>
            <MoreVertical size={20} color={colors.primary} />
          </Pressable>
        }
      />

      <ScrollView
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

        {item.attachments && item.attachments.length > 0 && (
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
              Attachments ({item.attachments.length})
            </Text>
            {item.attachments.map((attachment: any, idx: number) => (
              <View
                key={idx}
                style={{
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text style={{ color: colors.text, fontWeight: '500' }}>{attachment.name}</Text>
                  <Text style={{ color: colors.sub, fontSize: 12, marginTop: 2 }}>{attachment.size}</Text>
                </View>
                <Text style={{ color: colors.primary, fontWeight: '600' }}>↓</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

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
    </SafeAreaView>
  );
}
