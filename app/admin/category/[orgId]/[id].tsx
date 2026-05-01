import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useCategory } from '@/services/category';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { HtmlContent } from '@/components/details';
import { View } from '@/components/ui/view';

export default function CategoryDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useCategory(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="category"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/category/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/categories/${orgId}`}
      entityName="Category"
    >
      <View style={{ padding: 20, gap: 16 }}>
          {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
        </View>
    </DetailScreenShell>
  );
}
