import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function InvoiceQuoteScreen() {
  const { qId } = useLocalSearchParams<{ qId: string }>();

  return (
    <FormScreen
      icon="invoice"
      title="New Invoice"
      submitLabel="Create"
      successMessage="Invoice created successfully"
      contextInfo={`Context: Quote: ${qId}`}
    />
  );
}
