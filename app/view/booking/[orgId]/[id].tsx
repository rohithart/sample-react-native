import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useBooking } from '@/services/booking';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { EntityType } from '@/enums';
import { DetailField, HtmlContent } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';
import { convertToLocalDateString, convertToTimeString } from '@/utils/date';

export default function BookingDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useBooking(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="booking"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      features={['comments']}
      entityType={EntityType.BOOKING}
      entityId={id || ''}
      orgId={orgId || ''}
    >
      <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Description" html={item.description} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Booking information" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Type" value={item.bookingType?.title} />
              <DetailField label="From" value={convertToLocalDateString(item.bookingDateFrom)} />
              <DetailField label="Time From" value={convertToTimeString(item.bookingTimeFrom)} />
              <DetailField label="To" value={convertToLocalDateString(item.bookingDateTo)} />
              <DetailField label="Time To" value={convertToTimeString(item.bookingTimeTo)} />
              <DetailField label="Full Day" value={item.isFullDay ? 'Yes' : 'No'} />
            </VStack>
          </View>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="More information" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Approved" value={item.isApproved ? 'Yes' : 'No'} />
              <DetailField label="Approved By" value={item.approvedBy} />
              <DetailField label="Rejected" value={item.isRejected ? 'Yes' : 'No'} />
              <DetailField label="Rejected By" value={item.rejectedBy} />
            </VStack>
          </View>
        </View>
    </DetailScreenShell>
  );
}
