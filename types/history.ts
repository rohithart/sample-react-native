export interface HistoryEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  previousValue?: any;
  newValue?: any;
  userId?: string;
  createdAt: string;
}
