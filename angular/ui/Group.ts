import { Organisation } from './Organisation';

export class Group {
  _id: string;
  title: string;
  description: string;
  archived: boolean;
  createdBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
