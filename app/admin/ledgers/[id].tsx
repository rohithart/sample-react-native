import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useChartOfAccounts } from '@/services/chart-of-account';

export default function LedgersListScreen() {
  return (
    <ListScreen
      icon="ledger"
      title="Ledgers"
      config={ADMIN_CONFIGS.ledger}
      useData={useChartOfAccounts}
      addRoute="/admin/ledger/new"
      emptyMessage="No ledgers found"
    />
  );
}
