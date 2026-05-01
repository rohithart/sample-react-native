import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useInformation } from '@/services/information';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { EntityType } from '@/enums';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { onShare } from '@/utils/share';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { HtmlContent } from '@/components/details';
import { View } from '@/components/ui/view';

const I = ENTITY_ICONS;

export default function InformationDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching, dataUpdatedAt} = useInformation(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="information"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      dataUpdatedAt={dataUpdatedAt}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/information/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/informations/${orgId}`}
      entityName="Information"
      extraActions={[{ id: 'pdf', label: 'Download PDF', icon: <I.fileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf(EntityType.INFORMATION, id || ''), color: 'success' as const }, { id: 'share', label: 'Share', icon: <I.share size={24} color={colors.success} />, onPress: () => onShare(`Information on DarthVader: ${item?.title}`, `/view/information/${orgId}/${id}`), color: 'success' as const }]}
      features={['attachments', 'comments', 'images', 'timeline', 'history']}
      entityType={EntityType.INFORMATION}
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
        </View>
          )}
</DetailScreenShell>
  );
}
