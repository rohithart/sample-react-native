import { FormScreen } from '@/components/ui/form-screen';

export default function EditLedgerScreen() {
  return (
    <FormScreen
      icon="ledger"
      title="Edit Ledger"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Ledger updated successfully"
      initialName="Sample Ledger"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/ledger/${p.orgId}/${p.id}`}
    />
  );
}
