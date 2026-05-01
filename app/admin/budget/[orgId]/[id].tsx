import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useBudget } from '@/services/budget';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { DetailField, DetailSection, HtmlContent } from '@/components/details';
import { View } from '@/components/ui/view';

export default function BudgetDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useBudget(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="budget"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/budget/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/budgets/${orgId}`}
      entityName="Budget"
    >
      {(item) => (
      <View style={{ padding: 20, gap: 16 }}>
          {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
          <DetailSection title="Budget">
            <DetailField label="Amount" value={item.amount != null ? `$${Number(item.amount)}` : 'N/A'} />
            <DetailField label="Approved" value={item.isApproved ? 'Yes' : 'No'} />
          </DetailSection>
        </View>
          )}
</DetailScreenShell>
  );
}
