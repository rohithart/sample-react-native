import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function EventTypeScreen() {
  const { tId } = useLocalSearchParams<{ tId: string }>();

  return (
    <FormScreen
      icon="event"
      title="New Event"
      submitLabel="Create"
      successMessage="Event created successfully"
      contextInfo={`Context: Event Type: ${tId}`}
    />
  );
}
