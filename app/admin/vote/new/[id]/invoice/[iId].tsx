import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function VoteInvoiceScreen() {
  const { iId } = useLocalSearchParams<{ iId: string }>();

  return (
    <FormScreen
      icon="vote"
      title="New Vote"
      submitLabel="Create"
      successMessage="Vote created successfully"
      contextInfo={`Context: Invoice: ${iId}`}
    />
  );
}
