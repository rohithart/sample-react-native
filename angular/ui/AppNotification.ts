import { NotificationEntity, NotificationAction } from '../enum';
import { Organisation } from './Organisation';

export class AppNotification {
  _id: string;
  entityId?: string;
  action: NotificationAction;
  entityType: NotificationEntity;
  title: string;
  message?: string;
  url?: string;
  updatedBy: string;
  for: string;
  isRead: boolean;
  readAt?: Date;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
