import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, DetailSection, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { useVote, useCastedVote, useCastVote } from '@/services/vote';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { convertToLocalDateTimeString } from '@/utils/date';
import { VStack } from '@/components/ui/vstack';
import { useToast } from '@/context/toast-context';
import { SectionHeader } from '@/components/section-header';
import { LoadingState } from '@/components/ui/loading-state';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';

const I = ENTITY_ICONS;

function isVoteExpired(endDate: string | Date | undefined | null) {
  if (!endDate) return false;
  return new Date(endDate) < new Date();
}

export default function VoteDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const { showToast } = useToast();

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useVote(id || '');
  const { data: userCastedVote } = useCastedVote(orgId || '', id || '');
  const castVoteMutation = useCastVote(orgId || '', id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const handleCastVote = async (index: number) => {
    if (!item || item.closed || isVoteExpired(item.endDate)) return;

    try {
      await castVoteMutation.mutateAsync({ index });
      showToast({ type: 'success', title: 'Success', message: 'Your vote has been cast!' });
    } catch (error) {
      showToast({ type: 'error', title: 'Error', message: 'Failed to cast vote. Please try again.' });
    }
  };

  const actions: ActionItem[] = [
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
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
        <LoadingState />
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
              <DetailField label="Group" value={item.group?.title ?? 'N/A'} />
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
          
          {(item.closed || isVoteExpired(item.endDate)) && (
            <View style={{ padding: 16, backgroundColor: colors.dangerBg, borderRadius: 8, alignItems: 'center' }}>
              <I.lock size={24} color={colors.danger} />
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.danger, marginTop: 8 }}>
                {item.closed ? 'Voting Closed' : 'Voting Expired'}
              </Text>
              <Text style={{ fontSize: 14, color: colors.danger, textAlign: 'center', marginTop: 4 }}>
                {item.closed ? 'This vote has been closed and no more votes can be cast.' : 'This vote has ended and no more votes can be cast.'}
              </Text>
            </View>
          )}

          <DetailSection title="Options">
            {item.options.split(',').map((option: string, index: number) => {
              const isUserVote = userCastedVote&& userCastedVote?.voteIndex === index;

              return (
                <Pressable
                  key={index}
                  onPress={() => !item.closed && !isVoteExpired(item.endDate) && handleCastVote(index)}
                  disabled={item.closed || isVoteExpired(item.endDate) || castVoteMutation.isPending}
                  style={{
                    padding: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: isUserVote ? colors.primary : colors.border,
                    backgroundColor: isUserVote ? colors.primary + '10' : colors.card,
                    marginBottom: 8,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
                      {option}
                    </Text>
                    {isUserVote && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <I.checkCircle size={16} color={colors.primary} />
                        <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '600' }}>
                          Your Vote
                        </Text>
                      </View>
                    )}
                  </View>

                  {!item.closed && !isVoteExpired(item.endDate) && (
                    <Text style={{ fontSize: 12, color: colors.sub, marginTop: 4, textAlign: 'center' }}>
                      {isUserVote ? 'Tap to change vote' : 'Tap to vote'}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </DetailSection>
        </View>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
    </SafeAreaView>
  );
}
