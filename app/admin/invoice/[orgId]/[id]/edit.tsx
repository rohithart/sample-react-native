import { FormScreen } from '@/components/ui/form-screen';

export default function EditInvoiceScreen() {
  return (
    <FormScreen
      icon="invoice"
      title="Edit Invoice"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Invoice updated successfully"
      initialName="Sample Invoice"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/invoice/${p.orgId}/${p.id}`}
    />
  );
}
