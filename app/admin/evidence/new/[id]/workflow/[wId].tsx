import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function EvidenceWorkflowScreen() {
  const { wId } = useLocalSearchParams<{ wId: string }>();

  return (
    <FormScreen
      icon="evidence"
      title="New Evidence"
      submitLabel="Create"
      successMessage="Evidence created successfully"
      contextInfo={`Context: Workflow: ${wId}`}
    />
  );
}
