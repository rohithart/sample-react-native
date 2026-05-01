import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useUser } from '@/services/user';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { DetailField } from '@/components/details';
import { VStack } from '@/components/ui/vstack';
import { SectionHeader } from '@/components/section-header';
import { Image } from '@/components/ui/image';
import { View } from '@/components/ui/view';

export default function UserDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching } = useUser(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="user"
      title={item?.user?.name || item?.user?.email || 'User' || 'Loading...'}
      isLoading={isLoading}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/user/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/users/${orgId}`}
      entityName="User"
    >
      {(item) => (
      <View style={{ padding: 16, gap: 20 }}>
          {item.user?.image && (
            <View style={{ alignItems: 'center', padding: 16 }}>
              <Image source={{ uri: item.user.image }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            </View>
          )}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <SectionHeader title="User Information" style={{ fontSize: 10, fontWeight: '700', marginBottom: 0 }} />
            <VStack space="lg">
              <DetailField label="Name" value={item.user?.name} />
              <DetailField label="Email" value={item.user?.email} />
              <DetailField label="Role" value={item.role} />
            </VStack>
          </View>
        </View>
          )}
</DetailScreenShell>
  );
}
