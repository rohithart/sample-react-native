import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useUserRequest } from '@/services/user-request';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { DetailField, HtmlContent } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { View } from '@/components/ui/view';

export default function UserRequestDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useUserRequest(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="userRequest"
      title={item?.title || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/user-request/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/user-requests/${orgId}`}
      entityName="User Request"
    >
      <View style={{ padding: 16, gap: 20 }}>
          {item.description && (
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.border }}>
              <HtmlContent label="Description" html={item.description} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="Classification" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="User" value={item.createdBy ?? 'N/A'} />
            </VStack>
          </View>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="More information" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Approved" value={item.isApproved ? 'Yes' : 'No'} />
              <DetailField label="Approved By" value={item.approvedBy} />
              <DetailField label="Rejected" value={item.isRejected ? 'Yes' : 'No'} />
              <DetailField label="Rejected By" value={item.rejectedBy} />
            </VStack>
          </View>
        </View>
    </DetailScreenShell>
  );
}
