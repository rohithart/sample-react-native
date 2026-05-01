import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useAssetType } from '@/services/asset-type';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { HtmlContent } from '@/components/details';
import { View } from '@/components/ui/view';

export default function AssetTypeDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching, dataUpdatedAt} = useAssetType(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="assetType"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      dataUpdatedAt={dataUpdatedAt}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/asset-type/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/asset-types/${orgId}`}
      entityName="Asset Type"
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
