import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function InvoiceWorkflowScreen() {
  const { wId } = useLocalSearchParams<{ wId: string }>();

  return (
    <FormScreen
      icon="invoice"
      title="New Invoice"
      submitLabel="Create"
      successMessage="Invoice created successfully"
      contextInfo={`Context: Workflow: ${wId}`}
    />
  );
}
