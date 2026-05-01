import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useEvent } from '@/services/event';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { EntityType } from '@/enums';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { DetailField, HtmlContent, LinkedField } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';
import { convertToLocalDateString } from '@/utils/date';
import { resolveId } from '@/utils/resolve-ref';
import { onShare } from '@/utils/share';

const I = ENTITY_ICONS;

export default function EventDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useEvent(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="event"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/event/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/events/${orgId}`}
      entityName="Event"
      extraActions={[{ id: 'share', label: 'Share', icon: <I.share size={24} color={colors.success} />, onPress: () => onShare(`Event on DarthVader: ${item?.title}`, `/view/event/${orgId}/${id}`), color: 'success' as const }]}
      features={['attachments', 'comments', 'images', 'timeline', 'history']}
      entityType={EntityType.EVENT}
      entityId={id || ''}
      orgId={orgId || ''}
    >
      {(item) => (
      <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Description" html={item.description} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Classification" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <LinkedField label="Event Type" icon="eventType" value={item.eventType?.title} route={`/admin/event-type/${orgId}/${resolveId(item.eventType)}`} />
          </View>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Schedule" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="From" value={convertToLocalDateString(item.eventDateFrom)} />
              <DetailField label="To" value={convertToLocalDateString(item.eventDateTo)} />
            </VStack>
          </View>
        </View>
          )}
</DetailScreenShell>
  );
}
