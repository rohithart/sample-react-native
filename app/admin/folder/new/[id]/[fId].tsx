import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function NestedFolderScreen() {
  const { fId } = useLocalSearchParams<{ fId: string }>();

  return (
    <FormScreen
      icon="document"
      title="New Folder"
      submitLabel="Create"
      successMessage="Folder created successfully"
      contextInfo={`Context: Parent Folder: ${fId}`}
    />
  );
}
