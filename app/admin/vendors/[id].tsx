import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useVendors, useArchivedVendors } from '@/services/vendor';

export default function VendorsListScreen() {
  return (
    <ListScreen
      icon="vendor"
      title="Vendors"
      config={ADMIN_CONFIGS.vendor}
      useData={useVendors}
      useArchivedData={useArchivedVendors}
      addRoute="/admin/vendor/new"
      emptyMessage="No vendors found"
    />
  );
}
