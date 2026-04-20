import { EntityType } from '@/enums';
import { pdfApi } from '@/services/pdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export async function downloadAndSharePdf(entity: EntityType, entityId: string, fileName?: string): Promise<void> {
  try {
    const blob = await pdfApi.get(entity, entityId);
    const name = fileName || `${entity}-${entityId}.pdf`;
    const fileUri = `${FileSystem.cacheDirectory}${name}`;

    const reader = new FileReader();
    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', UTI: 'com.adobe.pdf' });
    } else {
      Alert.alert('PDF Downloaded', `File saved to ${fileUri}`);
    }
  } catch {
    Alert.alert('Error', 'Failed to download PDF. Please try again.');
  }
}
