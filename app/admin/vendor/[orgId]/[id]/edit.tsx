import { FormScreen } from '@/components/ui/form-screen';

export default function EditVendorScreen() {
  return (
    <FormScreen
      icon="vendor"
      title="Edit Vendor"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Vendor updated successfully"
      initialName="Sample Vendor"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/vendor/${p.orgId}/${p.id}`}
    />
  );
}
