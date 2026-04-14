import { ReminderFrequency } from '../enum';
import { Organisation } from './Organisation';

export class Reminder {
  _id: string;
  title: string;
  description?: string;
  frequency: ReminderFrequency;
  startDate: Date;
  additionalDate?: Date;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
