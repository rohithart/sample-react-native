import { FormScreen } from '@/components/ui/form-screen';

export default function AddInvoiceScreen() {
  return (
    <FormScreen
      icon="invoice"
      title="Add New Invoice"
      submitLabel="Create Invoice"
      successMessage="Invoice created successfully"
      getRedirectRoute={(p) => `/admin/invoices/${p.id}`}
    />
  );
}
