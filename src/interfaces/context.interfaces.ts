/**
 * Context & Settings Interfaces - User/Org context and configuration
 */

export interface UserContext {
  userId: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  organisations: string[];
  currentOrganisationId: string;
  settings?: Record<string, any>;
}

export interface OrganisationContext {
  orgId: string;
  name: string;
  logo?: string;
  settings?: Record<string, any>;
  members: number;
  role: string;
}

export interface UISettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    frequency: 'instant' | 'daily' | 'weekly';
  };
  layout: {
    sidebarCollapsed: boolean;
    defaultView: string;
  };
  customSettings?: Record<string, any>;
}

export interface SettingsContext {
  orgId: string;
  businessInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
  };
  financialSettings?: {
    currency: string;
    financialYearStart: string;
    taxRate: number;
  };
  notificationSettings?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    inAppNotifications: boolean;
  };
  customSettings?: Record<string, any>;
}

export interface AdminOrganisation {
  id: string;
  name: string;
  status: 'active' | 'suspended' | 'archived';
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookingType {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  resources: string[];
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface EventType {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  color?: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface VendorComment {
  id: string;
  vendorId: string;
  authorId: string;
  authorName: string;
  content: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorSubmission {
  id: string;
  vendorId: string;
  submissionType: string;
  data: Record<string, any>;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}
