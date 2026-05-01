import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function InvoiceWorkorderScreen() {
  const { woId } = useLocalSearchParams<{ woId: string }>();

  return (
    <FormScreen
      icon="invoice"
      title="New Invoice"
      submitLabel="Create"
      successMessage="Invoice created successfully"
      contextInfo={`Context: Work Order: ${woId}`}
    />
  );
}
