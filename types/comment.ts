export interface Comment {
  id: string;
  orgId: string;
  content: string;
  userId?: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
  updatedAt: string;
}
