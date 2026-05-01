import { FormScreen } from '@/components/ui/form-screen';

export default function AddVendorScreen() {
  return (
    <FormScreen
      icon="vendor"
      title="Add New Vendor"
      submitLabel="Create Vendor"
      successMessage="Vendor created successfully"
      getRedirectRoute={(p) => `/admin/vendors/${p.id}`}
    />
  );
}
