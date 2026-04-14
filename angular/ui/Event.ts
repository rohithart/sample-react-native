import { Organisation } from './Organisation';
import { EventType } from './EventType';
import { ReminderFrequency } from '../enum';

export class Event {
  _id: string;
  title: string;
  description: string;
  eventDateFrom: Date;
  eventTimeFrom?: Date;
  eventDateTo?: Date;
  eventTimeTo?: Date;
  isFullDay: boolean;
  isRecurring: boolean;
  frequency: ReminderFrequency;
  interval?: number;
  byWeekday?: number[];
  eventType: EventType;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
