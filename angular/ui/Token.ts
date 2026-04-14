import { User } from './User';

export class Token {
  _id: string;
  user: User;
  token: string;
  platform: string;
  deviceId: string;
  deviceInfo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
