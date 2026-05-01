import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useChartOfAccounts } from '@/services/chart-of-account';

export default function ChartOfAccountsListScreen() {
  return (
    <ListScreen
      icon="chartOfAccount"
      title="Chart of Accounts"
      config={ADMIN_CONFIGS.chartOfAccount}
      useData={useChartOfAccounts}
      addRoute="/admin/coa/new"
      emptyMessage="No chart of accounts found"
    />
  );
}
