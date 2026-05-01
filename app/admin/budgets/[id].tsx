import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useBudgets } from '@/services/budget';

export default function BudgetsListScreen() {
  return (
    <ListScreen
      icon="budget"
      title="Budgets"
      config={ADMIN_CONFIGS.budget}
      useData={useBudgets}
      addRoute="/admin/budget/new"
      emptyMessage="No budgets found"
    />
  );
}
