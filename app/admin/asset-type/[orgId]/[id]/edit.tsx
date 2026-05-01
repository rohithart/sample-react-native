import { FormScreen } from '@/components/ui/form-screen';

export default function EditAssetTypeScreen() {
  return (
    <FormScreen
      icon="assetType"
      title="Edit Asset Type"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Asset Type updated successfully"
      initialName="Sample Asset Type"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/asset-type/${p.orgId}/${p.id}`}
    />
  );
}
