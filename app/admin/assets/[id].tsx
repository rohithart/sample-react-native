import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useAssets, useArchivedAssets } from '@/services/asset';

export default function AssetsListScreen() {
  return (
    <ListScreen
      icon="asset"
      title="Assets"
      config={ADMIN_CONFIGS.asset}
      useData={useAssets}
      useArchivedData={useArchivedAssets}
      addRoute="/admin/asset/new"
      emptyMessage="No assets found"
    />
  );
}
