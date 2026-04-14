import { HistoryChanges } from '../interfaces';

export interface History {
  documentId: string;
  action: string;
  updatedBy: string;
  createdAt: Date;
  changes: HistoryChanges[];
}
