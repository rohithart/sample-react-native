import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useAsset } from '@/services/asset';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { EntityType } from '@/enums';
import { downloadAndSharePdf } from '@/utils/pdf-download';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { HtmlContent, LinkedField } from '@/components/details';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';
import { resolveId } from '@/utils/resolve-ref';

const I = ENTITY_ICONS;

export default function AssetDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching, dataUpdatedAt} = useAsset(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="asset"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      dataUpdatedAt={dataUpdatedAt}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/asset/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/assets/${orgId}`}
      entityName="Asset"
      extraActions={[{ id: 'pdf', label: 'Download PDF', icon: <I.fileDown size={24} color={colors.success} />, onPress: () => downloadAndSharePdf(EntityType.ASSET, id || ''), color: 'success' as const }]}
      features={['attachments', 'comments', 'images', 'timeline', 'history']}
      entityType={EntityType.ASSET}
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
            <LinkedField label="Asset Type" icon="assetType" value={item.assetType?.title} route={`/admin/asset-type/${orgId}/${resolveId(item.assetType)}`} />
          </View>
        </View>
          )}
</DetailScreenShell>
  );
}
