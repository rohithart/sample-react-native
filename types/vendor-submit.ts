export interface VendorSubmission {
  id: string;
  vendorId: string;
  entityType: string;
  entityId: string;
  status?: string;
  data?: any;
  createdAt: string;
  updatedAt: string;
}
