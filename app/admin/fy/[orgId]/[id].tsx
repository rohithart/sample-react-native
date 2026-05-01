import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useFinancialYear } from '@/services/financial-year';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { DetailField, DetailSection } from '@/components/details';
import { View } from '@/components/ui/view';
import { convertToLocalDateString } from '@/utils/date';

export default function FinancialYearDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useFinancialYear(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="financialYear"
      title={item?.title || 'Financial Year' || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/fy/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/financial-years/${orgId}`}
      entityName="Financial Year"
    >
      {(item) => (
      <View style={{ padding: 20, gap: 16 }}>
          <DetailSection title="Period">
            <DetailField label="From" value={convertToLocalDateString(item.from)} />
            <DetailField label="To" value={convertToLocalDateString(item.to)} />
            <DetailField label="Current" value={item.isCurrent ? 'Yes' : 'No'} />
          </DetailSection>
        </View>
          )}
</DetailScreenShell>
  );
}
