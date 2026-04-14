import { Group } from './Group';
import { Organisation } from './Organisation';

export class Announcement {
  _id: string;
  title: string;
  description: string;
  allUsers: boolean;
  createdBy: string;
  updatedBy: string;
  group?: Group;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
