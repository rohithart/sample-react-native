import { FormScreen } from '@/components/ui/form-screen';

export default function AddFinancialYearScreen() {
  return (
    <FormScreen
      icon="financialYear"
      title="Add Financial Year"
      submitLabel="Create Financial Year"
      successMessage="Financial Year created successfully"
      getRedirectRoute={(p) => `/admin/financial-years/${p.id}`}
    />
  );
}
