import { Organisation } from './Organisation';

export class Folder {
  _id: string;
  name: string;
  parent?: Folder | null;
  organisation: Organisation;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
