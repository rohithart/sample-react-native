export interface Document {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  folderId?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}
