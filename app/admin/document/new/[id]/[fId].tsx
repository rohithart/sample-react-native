import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function DocumentFolderScreen() {
  const { fId } = useLocalSearchParams<{ fId: string }>();

  return (
    <FormScreen
      icon="file"
      title="New Document"
      submitLabel="Create"
      successMessage="Document created successfully"
      contextInfo={`Context: Folder: ${fId}`}
    />
  );
}
