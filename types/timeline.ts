export interface TimelineEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  userId?: string;
  details?: string;
  createdAt: string;
}
