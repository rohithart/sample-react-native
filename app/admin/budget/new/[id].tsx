import { FormScreen } from '@/components/ui/form-screen';

export default function AddBudgetScreen() {
  return (
    <FormScreen
      icon="budget"
      title="Add New Budget"
      submitLabel="Create Budget"
      successMessage="Budget created successfully"
      getRedirectRoute={(p) => `/admin/budgets/${p.id}`}
    />
  );
}
