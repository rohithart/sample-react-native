import { useThemeColors } from '@/hooks/use-theme-colors';
import { PageHeader } from '@/components/ui/page-header';
import { DetailField, DetailSection, HtmlContent, AuditInfo } from '@/components/details';
import { Stack, useLocalSearchParams } from 'expo-router';

import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionBottomSheet } from '@/components/sheets/action-bottom-sheet';
import { ActionItem } from '@/types/actionItem';
import { useMeeting } from '@/services/meeting';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { convertToLocalDateString, convertToTimeString } from '@/utils/date';

const I = ENTITY_ICONS;

export default function MeetingDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showAudit, setShowAudit] = useState(false);

  const { data: item, isLoading: isLoadingItem, refetch, isRefetching } = useMeeting(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  const actions: ActionItem[] = [
    { id: 'audit', label: 'Audit Info', icon: <I.information size={24} color={colors.secondary} />, onPress: () => setShowAudit(true), color: 'primary' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="meeting"
        title={item?.title || 'Loading...'}
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
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {item.agenda ? <HtmlContent label="Agenda" html={item.agenda} /> : null}
        {item.details ? <HtmlContent label="Details" html={item.details} /> : null}
        {item.mom ? <HtmlContent label="Minutes of Meeting" html={item.mom} /> : null}
        <DetailSection title="Schedule">
          <DetailField label="Date" value={convertToLocalDateString(item.meetingDate)} />
          <DetailField label="Time" value={convertToTimeString(item.meetingTime)} />
          <DetailField label="Duration" value={item.duration ? item.duration + ' min' : null} />
        </DetailSection>
        <DetailSection title="Links">
          <DetailField label="Teams Link" value={item.teamsLink} />
          <DetailField label="Meet Link" value={item.meetLink} />
        </DetailSection>
      </ScrollView>
      )}

      <ActionBottomSheet isVisible={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} actions={actions} />
      <AuditInfo isVisible={showAudit} onClose={() => setShowAudit(false)} createdBy={item?.createdBy} updatedBy={item?.updatedBy} createdAt={item?.createdAt} updatedAt={item?.updatedAt} />
    </SafeAreaView>
  );
}
