import { DetailScreenShell } from '@/components/ui/detail-screen-shell';
import { useVendor } from '@/services/vendor';
import { useLocalSearchParams } from 'expo-router';
import { useRefreshControl } from '@/hooks/use-refresh-control';
import { useThemeColors } from '@/hooks/use-theme-colors';
import React from 'react';
import { EntityType } from '@/enums';
import { DetailField, DetailSection } from '@/components/details';
import { View } from '@/components/ui/view';

export default function VendorDetailScreen() {
  const { orgId, id } = useLocalSearchParams<{ orgId: string; id: string }>();
  const colors = useThemeColors();
  const { data: item, isLoading, refetch, isRefetching, dataUpdatedAt} = useVendor(id || '');
  const refreshControl = useRefreshControl(refetch, isRefetching);

  return (
    <DetailScreenShell
      icon="vendor"
      title={item?.name || 'Loading...'}
      isLoading={isLoading}
      dataUpdatedAt={dataUpdatedAt}
      item={item}
      refreshControl={refreshControl}
      editRoute={`/admin/vendor/${orgId}/${id}/edit`}
      deleteRedirectRoute={`/admin/vendors/${orgId}`}
      entityName="Vendor"
      features={['comments', 'timeline']}
      entityType={EntityType.VENDOR}
      entityId={id || ''}
      orgId={orgId || ''}
    >
      {(item) => (
      <View style={{ padding: 20, gap: 16 }}>
          <DetailSection title="Contact">
            <DetailField label="Email" value={item.email} />
            <DetailField label="Contact Person" value={item.contactPerson} />
            <DetailField label="Contact Number" value={item.contactNumber} />
            <DetailField label="Address" value={item.address} />
          </DetailSection>
          <DetailSection title="Business">
            <DetailField label="Tax Number" value={item.tax} />
            <DetailField label="Reference" value={item.ref} />
            <DetailField label="Archived" value={item.archived ? 'Yes' : 'No'} />
          </DetailSection>
        </View>
          )}
</DetailScreenShell>
  );
}
