import { FormScreen } from '@/components/ui/form-screen';

export default function EditWorkOrderScreen() {
  return (
    <FormScreen
      icon="workorder"
      title="Edit Work Order"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Work Order updated successfully"
      initialName="Sample Work Order"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/workorder/${p.orgId}/${p.id}`}
    />
  );
}
