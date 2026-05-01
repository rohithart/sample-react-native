import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useChartOfAccount } from '@/services/chart-of-account';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { DetailField, DetailSection, HtmlContent } from '@/components/details';
import { View } from '@/components/ui/view';

export default function LedgerDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useChartOfAccount(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="ledger"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/ledger/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/ledgers/${orgId}`}
      entityName="Ledger"
    >
      <View style={{ padding: 20, gap: 16 }}>
          {item.description ? <HtmlContent label="Description" html={item.description} /> : null}
          <DetailSection title="Account">
            <DetailField label="Code" value={item.code} />
            <DetailField label="Account Type" value={item.accountType} />
          </DetailSection>
        </View>
    </DetailScreenShell>
  );
}
