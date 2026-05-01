import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function LedgerInvoiceScreen() {
  const { oId } = useLocalSearchParams<{ oId: string }>();

  return (
    <FormScreen
      icon="ledger"
      title="New Ledger Entry"
      submitLabel="Create"
      successMessage="Ledger Entry created successfully"
      contextInfo={`Context: Invoice: ${oId}`}
    />
  );
}
