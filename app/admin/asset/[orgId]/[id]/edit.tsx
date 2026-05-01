import { FormScreen } from '@/components/ui/form-screen';

export default function EditAssetScreen() {
  return (
    <FormScreen
      icon="asset"
      title="Edit Asset"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Asset updated successfully"
      initialName="Sample Asset"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/asset/${p.orgId}/${p.id}`}
    />
  );
}
