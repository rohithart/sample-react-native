import { ADMIN_CONFIGS } from '@/components/cards/card-configs';
import { ListScreen } from '@/components/ui/list-screen';
import { useFinancialYears } from '@/services/financial-year';

export default function FinancialYearsListScreen() {
  return (
    <ListScreen
      icon="financialYear"
      title="Financial Years"
      config={ADMIN_CONFIGS.financialYear}
      useData={useFinancialYears}
      addRoute="/admin/fy/new"
      emptyMessage="No financial years found"
    />
  );
}
