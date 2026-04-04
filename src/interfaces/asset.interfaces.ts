/**
 * Asset Interfaces - Asset management and file handling
 */

export interface Asset {
  id: string;
  orgId: string;
  assetTypeId: string;
  name: string;
  description?: string;
  serialNumber?: string;
  purchaseDate?: string;
  value: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface AssetType {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  depreciationRate?: number;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  orgId: string;
  entityId: string;
  entityType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  orgId: string;
  entityId: string;
  entityType: string;
  description?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  orgId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  width?: number;
  height?: number;
  altText?: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}
