import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function WorkorderQuoteScreen() {
  const { qId } = useLocalSearchParams<{ qId: string }>();

  return (
    <FormScreen
      icon="workorder"
      title="New Work Order"
      submitLabel="Create"
      successMessage="Work Order created successfully"
      contextInfo={`Context: Quote: ${qId}`}
    />
  );
}
