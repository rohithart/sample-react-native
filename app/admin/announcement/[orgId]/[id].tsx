import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useAnnouncement } from '@/services/announcement';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { DetailField, GroupRelationship, HtmlContent } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';
import { onShare } from '@/utils/share';

const I = ENTITY_ICONS;

export default function AnnouncementDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useAnnouncement(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="announcement"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/announcement/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/announcements/${orgId}`}
      entityName="Announcement"
      extraActions={[{ id: 'share', label: 'Share', icon: <I.share size={24} color={colors.success} />, onPress: () => onShare(`Announcement on DarthVader: ${item?.title}`, `/view/announcement/${orgId}/${id}`), color: 'success' as const }]}
    >
      <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Description" html={item.description} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Classification" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <GroupRelationship orgId={orgId || ''} item={item} />
          </View>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="More information" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="All Users" value={item.allUsers ? 'Yes' : 'No'} />
            </VStack>
          </View>
        </View>
    </DetailScreenShell>
  );
}
