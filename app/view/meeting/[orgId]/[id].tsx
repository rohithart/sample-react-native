import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useMeeting } from '@/services/meeting';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { DetailField, HtmlContent } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';
import { convertToLocalDateString } from '@/utils/date';

export default function MeetingDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useMeeting(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="meeting"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
    >
      {(item) => (
      <View style={{ padding: 16, gap: 20 }}>
          {item.details && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Details" html={item.details} />
            </View>
          )}
          {item.agenda && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Agenda" html={item.agenda} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Classification" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Group" value={item.group?.title ?? 'N/A'} />
              <DetailField label="All Users" value={item.allUsers ? 'Yes' : 'No'} />
            </VStack>
          </View>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Schedule" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Date" value={convertToLocalDateString(item.meetingDate)} />
              <DetailField label="Time" value={item.meetingTime?.toString()} />
              <DetailField label="Duration" value={item.duration ? item.duration + ' hr' : null} />
              <DetailField label="Teams Link" value={item.teamsLink} />
              <DetailField label="Meet Link" value={item.meetLink} />
            </VStack>
          </View>
        </View>
          )}
</DetailScreenShell>
  );
}
