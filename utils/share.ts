import { Share } from 'react-native';

export const onShare = async (message: string, url?: string, baseURL: string = 'https://app.darthvader.com') => {
  try {
    await Share.share(
      url
        ? { message: `${message}\n${baseURL}${url}`, url: `${baseURL}${url}` }
        : { message }
    );
  } catch (error: any) {
    console.log(error.message);
  }
};