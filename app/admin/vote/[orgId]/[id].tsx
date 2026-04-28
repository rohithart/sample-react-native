import { AuditInfo, DetailField, DetailSection, GroupRelationship, LinkedField } from '@/components/details';
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog';
import { EntityTimeline } from '@/components/entity/entity-timeline';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { PageHeader } from '@/components/ui/page-header';
import { useOrganisationContext } from '@/context/organisation-context';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAllCastedVotes, useVote } from '@/services/vote';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityType } from '@/enums';
import { convertToLocalDateTimeString } from '@/utils/date';
import { VStack } from '@/components/ui/vstack';
import { resolveId } from '@/utils/resolve-ref';
import { useToast } from '@/context/toast-context';
import { SectionHeader } from '@/components/section-header';

const I = ENTITY_ICONS;

export default function VoteDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const { isAdmin } = useOrganisationContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'delete' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const { showToast } = useToast(); 

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useVote(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);
  const { data: userCastedVote } = useAllCastedVotes(id || '');

  const voteCounts = useMemo(() => {
    const optionsString = item?.options || "";
    if (!optionsString) return [];

    const options = optionsString.split(',').map((o: string) => o.trim());
    const counts = new Array(options.length).fill(0);

    if (!Array.isArray(userCastedVote) || userCastedVote.length === 0) {
      return counts;
    }

    userCastedVote.forEach((v: any) => {
      const vIndex = Number(v?.voteIndex);
      if (!isNaN(vIndex) && vIndex >= 0 && vIndex < options.length) {
        counts[vIndex]++;
      }
    });

    return counts;
  }, [item?.options, userCastedVote]);

    
  const handleDelete = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'Vote deleted successfully' });
    router.push(`/admin/votes/${orgId}`);
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsProcessing(false);
    setConfirmationType(null);
    showToast({ type: 'success', title: 'Success', message: 'Vote archived successfully' });
  };

  const actions: ActionItem[] = [
    ...(isAdmin ? [{
      id: 'edit',
      label: 'Edit',
      icon: <I.edit size={24} color={colors.primary} />,
      onPress: () => router.push(`/admin/vote/${orgId}/${id}/edit`),
      color: 'primary' as const,
    }] : []),
    ...(isAdmin ? [{
      id: 'archive',
      label: 'Archive',
      icon: <I.archiveRestore size={24} color={colors.warning} />,
      onPress: () => setConfirmationType('archive'),
      color: 'warning' as const,
    }] : []),
    { id: 'timeline', label: 'Timeline', icon: <I.clock size={24} color={colors.secondary} />, onPress: () => setShowTimeline(true), color: 'primary' as const },
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
      <PageHeader icon="vote"
        title={item?.question || 'Loading...'}
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
        <View style={{ padding: 16, gap: 20 }}>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Classification" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <LinkedField label="Workflow" icon="workflow" value={item.workflow?.title} route={`/admin/workflow/${orgId}/${resolveId(item.workflow)}`} />
              <GroupRelationship orgId={orgId || ''} item={item} />
              <DetailField label="All Users" value={item.allUsers ? 'Yes' : 'No'} />
            </VStack>
          </View>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Vote status" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            
            <VStack space="lg">
              <DetailField label="Status" value={item.closed ? 'Closed' : 'Open'} />
              <DetailField label="End Date" value={convertToLocalDateTimeString(item.endDate)} />
            </VStack>
          </View>

          <DetailSection title="Vote Results">
            {item.options.split(',').map((option: string, index: number) => {
              const count = voteCounts?.[index] ?? 0;
              const totalVotes = userCastedVote?.length || 0;
              
              const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

              return (
                <View
                  key={index}
                  style={{
                    marginBottom: 10,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    overflow: 'hidden',
                    height: 70,
                    justifyContent: 'center',
                  }}
                >
                  <View 
                    style={{ 
                      position: 'absolute', 
                      left: 0, 
                      top: 0, 
                      bottom: 0, 
                      width: `${percentage}%`, 
                      backgroundColor: colors.primary + '15',
                    }} 
                  />

                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    zIndex: 1
                  }}>
                    <VStack style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text }}>
                        {option.trim()}
                      </Text>
                      <Text style={{ fontSize: 12, color: colors.sub, marginTop: 2 }}>
                        {count} {count === 1 ? 'vote' : 'votes'} ({percentage.toFixed(0)}%)
                      </Text>
                    </VStack>

                    <View style={{ 
                      width: 32, height: 32, borderRadius: 16, 
                      backgroundColor: count > 0 ? colors.primary + '15' : colors.bg,
                      alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <I.vote size={16} color={count > 0 ? colors.primary : colors.sub} />
                    </View>
                  </View>
                </View>
              );
            })}
          </DetailSection>

        </View>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <ConfirmationDialog isOpen={confirmationType === 'delete'} onClose={() => setConfirmationType(null)} onConfirm={handleDelete} type="delete" isLoading={isProcessing} />
      <ConfirmationDialog isOpen={confirmationType === 'archive'} onClose={() => setConfirmationType(null)} onConfirm={handleArchive} type="archive" isLoading={isProcessing} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityTimeline isVisible={showTimeline} onClose={() => setShowTimeline(false)} entity={EntityType.VOTE} entityId={id || ''} />
    </SafeAreaView>
  );
}
