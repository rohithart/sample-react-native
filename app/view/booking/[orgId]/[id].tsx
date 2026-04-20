import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, DetailSection, HtmlContent, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { useBooking } from '@/services/booking';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { EntityComments } from '@/components/entity/entity-comments';
import { EntityType } from '@/enums';

const I = ENTITY_ICONS;

function fmt(d: string | Date | undefined | null) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }

function calculateDuration(from: string | Date | undefined | null, to: string | Date | undefined | null) {
  if (!from || !to) return '—';
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
}

export default function BookingDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useBooking(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const actions: ActionItem[] = [
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
    { id: 'comments', label: 'Comments', icon: <I.comment size={24} color={colors.primary} />, onPress: () => setShowComments(true), color: 'primary' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="booking"
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
        <DetailSection title="Schedule">
          <DetailField label="From" value={fmt(item.bookingDateFrom)} />
          <DetailField label="To" value={fmt(item.bookingDateTo)} />
          <DetailField label="Full Day" value={item.isFullDay ? 'Yes' : 'No'} />
          <DetailField label="Duration" value={calculateDuration(item.bookingDateFrom, item.bookingDateTo)} />
        </DetailSection>
        <DetailSection title="Status">
          <DetailField label="Status" value={item.isApproved ? 'Approved' : item.isRejected ? 'Rejected' : 'Pending'} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
      <EntityComments isVisible={showComments} onClose={() => setShowComments(false)} entity={EntityType.BOOKING} entityId={id || ''} orgId={orgId || ''} />
    </SafeAreaView>
  );
}
