import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_KEY = '@app/device_id';

export async function getOrCreateDeviceId(): Promise<string> {
  try {
    const existingId = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (existingId) {
      return existingId;
    }

    const newId = uuidv4();
    await AsyncStorage.setItem(DEVICE_ID_KEY, newId);
    return newId;
  } catch (error) {
    console.error('Error managing device ID:', error);
    return uuidv4();
  }
}

export async function getDeviceId(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(DEVICE_ID_KEY);
  } catch (error) {
    console.error('Error getting device ID:', error);
    return null;
  }
}
