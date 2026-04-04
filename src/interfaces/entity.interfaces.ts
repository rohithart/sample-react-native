/**
 * Entity Interfaces - Core business entities with CRUD operations
 */

export interface Task {
  id: string;
  orgId: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'archived';
  userId?: string;
  workflowId?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  flagged?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  orgId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  orgId: string;
  invoiceNumber: string;
  vendorId: string;
  amount: number;
  dueDate?: string;
  status: 'draft' | 'submitted' | 'approved' | 'paid' | 'archived';
  workflowId?: string;
  quoteId?: string;
  workorderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  orgId: string;
  quoteNumber: string;
  vendorId: string;
  amount: number;
  expiryDate?: string;
  status: 'draft' | 'submitted' | 'approved' | 'accepted' | 'archived';
  workflowId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workorder {
  id: string;
  orgId: string;
  workorderNumber: string;
  vendorId: string;
  quoteId?: string;
  status: 'draft' | 'submitted' | 'in_progress' | 'completed' | 'archived';
  workflowId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentStore {
  id: string;
  orgId: string;
  folderId?: string;
  name: string;
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  orgId: string;
  financialYearId: string;
  type: 'debit' | 'credit';
  amount: number;
  description?: string;
  date: string;
  status: 'pending' | 'completed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  reactions?: Record<string, number>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
