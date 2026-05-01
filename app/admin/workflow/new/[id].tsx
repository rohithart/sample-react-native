import { FormScreen } from '@/components/ui/form-screen';

export default function AddWorkflowScreen() {
  return (
    <FormScreen
      icon="workflow"
      title="Add New Workflow"
      submitLabel="Create Workflow"
      successMessage="Workflow created successfully"
      getRedirectRoute={(p) => `/admin/workflows/${p.id}`}
    />
  );
}
