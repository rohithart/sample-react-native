import { FormScreen } from '@/components/ui/form-screen';

export default function AddAssetScreen() {
  return (
    <FormScreen
      icon="asset"
      title="Add New Asset"
      submitLabel="Create Asset"
      successMessage="Asset created successfully"
      getRedirectRoute={(p) => `/admin/assets/${p.id}`}
    />
  );
}
