export interface Attachment {
  id: string;
  orgId: string;
  name: string;
  url: string;
  entityType?: string;
  entityId?: string;
  size?: number;
  mimeType?: string;
  createdAt: string;
  updatedAt: string;
}
