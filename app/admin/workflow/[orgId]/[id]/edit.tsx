import { FormScreen } from '@/components/ui/form-screen';

export default function EditWorkflowScreen() {
  return (
    <FormScreen
      icon="workflow"
      title="Edit Workflow"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Workflow updated successfully"
      initialName="Sample Workflow"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/workflow/${p.orgId}/${p.id}`}
    />
  );
}
