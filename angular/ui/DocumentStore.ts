import { Folder } from './Folder';
import { Organisation } from './Organisation';

export class DocumentStore {
  _id: string;
  title: string;
  description?: string;
  archived: boolean;
  isFlagged: boolean;
  flagComment?: string;
  folder?: Folder;
  createdBy: string;
  updatedBy: string;
  organisation: Organisation;
  createdAt: string;
  updatedAt: string;
}
