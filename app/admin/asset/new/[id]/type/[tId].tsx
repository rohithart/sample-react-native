import { FormScreen } from '@/components/ui/form-screen';
import { useLocalSearchParams } from 'expo-router';

export default function AssetTypeScreen() {
  const { tId } = useLocalSearchParams<{ tId: string }>();

  return (
    <FormScreen
      icon="asset"
      title="New Asset"
      submitLabel="Create"
      successMessage="Asset created successfully"
      contextInfo={`Context: Asset Type: ${tId}`}
    />
  );
}
