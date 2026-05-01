import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function TaskWorkflowScreen() {
  const { wId } = useLocalSearchParams<{ wId: string }>();

  return (
    <FormScreen
      icon="task"
      title="New Task"
      submitLabel="Create"
      successMessage="Task created successfully"
      contextInfo={`Context: Workflow: ${wId}`}
    />
  );
}
