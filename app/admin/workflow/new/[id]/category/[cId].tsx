import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function WorkflowCategoryScreen() {
  const { cId } = useLocalSearchParams<{ cId: string }>();

  return (
    <FormScreen
      icon="workflow"
      title="New Workflow"
      submitLabel="Create"
      successMessage="Workflow created successfully"
      contextInfo={`Context: Category: ${cId}`}
    />
  );
}
