import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useInvoices, useArchivedInvoices } from '@/services/invoice';

export default function InvoicesListScreen() {
  return (
    <ListScreen
      icon="invoice"
      title="Invoices"
      config={ADMIN_CONFIGS.invoice}
      useData={useInvoices}
      useArchivedData={useArchivedInvoices}
      addRoute="/admin/invoice/new"
      emptyMessage="No invoices found"
    />
  );
}
