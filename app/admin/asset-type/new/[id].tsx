import { FormScreen } from '@/components/ui/form-screen';

export default function AddAssetTypeScreen() {
  return (
    <FormScreen
      icon="assetType"
      title="Add New Asset Type"
      submitLabel="Create Asset Type"
      successMessage="Asset Type created successfully"
      getRedirectRoute={(p) => `/admin/asset-types/${p.id}`}
    />
  );
}
