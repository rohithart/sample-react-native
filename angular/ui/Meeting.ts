import { Organisation } from './Organisation';
import { Group } from './Group';

export class Meeting {
  _id: string;
  title: string;
  agenda: string;
  details: string;
  mom?: string;
  meetingDate: Date;
  meetingTime: Date;
  duration: Number;
  teamsLink?: string;
  meetLink?: string;
  archived: boolean;
  allUsers: boolean;
  createdBy: string;
  updatedBy: string;
  group?: Group;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
