import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function VoteQuoteScreen() {
  const { qId } = useLocalSearchParams<{ qId: string }>();

  return (
    <FormScreen
      icon="vote"
      title="New Vote"
      submitLabel="Create"
      successMessage="Vote created successfully"
      contextInfo={`Context: Quote: ${qId}`}
    />
  );
}
