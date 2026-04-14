import { Organisation } from './Organisation';

export class EventType {
  _id: string;
  title: string;
  description: string;
  color?: string;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
