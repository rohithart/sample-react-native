import { FormScreen } from '@/components/ui/form-screen';

export default function EditTaskScreen() {
  return (
    <FormScreen
      icon="task"
      title="Edit Task"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      successMessage="Task updated successfully"
      initialName="Sample Task"
      initialDescription="This is a sample description."
      getRedirectRoute={(p) => `/admin/task/${p.orgId}/${p.id}`}
    />
  );
}
