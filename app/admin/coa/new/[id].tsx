import { FormScreen } from '@/components/ui/form-screen';

export default function AddChartOfAccountScreen() {
  return (
    <FormScreen
      icon="chartOfAccount"
      title="Add Chart of Account"
      submitLabel="Create Account"
      successMessage="Chart of Account created successfully"
      getRedirectRoute={(p) => `/admin/chart-of-accounts/${p.id}`}
    />
  );
}
