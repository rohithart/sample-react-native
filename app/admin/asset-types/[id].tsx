import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useAssetTypes } from '@/services/asset-type';

export default function AssetTypesListScreen() {
  return (
    <ListScreen
      icon="assetType"
      title="Asset Types"
      config={ADMIN_CONFIGS.assetType}
      useData={useAssetTypes}
      addRoute="/admin/asset-type/new"
      emptyMessage="No asset types found"
    />
  );
}
