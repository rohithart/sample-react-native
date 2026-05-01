import { FormScreen } from '@/components/ui/form-screen';

export default function AddTaskScreen() {
  return (
    <FormScreen
      icon="task"
      title="Add New Task"
      submitLabel="Create Task"
      successMessage="Task created successfully"
      getRedirectRoute={(p) => `/admin/tasks/${p.id}`}
    />
  );
}
