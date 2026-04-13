export interface Asset {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  assetTypeId?: string;
  status?: string;
  archived?: boolean;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
  updatedAt: string;
}
