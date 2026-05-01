import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function QuoteWorkflowScreen() {
  const { wId } = useLocalSearchParams<{ wId: string }>();

  return (
    <FormScreen
      icon="quote"
      title="New Quote"
      submitLabel="Create"
      successMessage="Quote created successfully"
      contextInfo={`Context: Workflow: ${wId}`}
    />
  );
}
