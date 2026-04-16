import adminData from '@/assets/help/admin.json';
import userData from '@/assets/help/user.json';

export interface HelpItem {
  heading: string;
  content: string;
}

export function getHelpData(type: 'admin' | 'user'): HelpItem[] {
  switch (type) {
    case 'admin':
      return adminData.data;
    case 'user':
      return userData.data;
    default:
      throw new Error(`Invalid help type: ${type}`);
  }
}