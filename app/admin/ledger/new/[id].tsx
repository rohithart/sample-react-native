import { FormScreen } from '@/components/ui/form-screen';

export default function AddLedgerScreen() {
  return (
    <FormScreen
      icon="ledger"
      title="Add New Ledger"
      submitLabel="Create Ledger"
      successMessage="Ledger created successfully"
      getRedirectRoute={(p) => `/admin/ledgers/${p.id}`}
    />
  );
}
