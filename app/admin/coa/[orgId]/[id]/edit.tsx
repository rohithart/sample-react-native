import { FormScreen } from '@/components/ui/form-screen';

export default function EditChartOfAccountScreen() {
  return (
    <FormScreen
      icon="chartOfAccount"
      title="Edit Chart of Account"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Chart of Account updated successfully"
      initialName="Sample Chart of Account"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/coa/${p.orgId}/${p.id}`}
    />
  );
}
