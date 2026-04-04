/**
 * Utility Interfaces - Platform utilities, analytics, and helpers
 */

export interface SearchResult {
  id: string;
  type: string;
  title: string;
  description?: string;
  relevance: number;
  entityId: string;
  entityType: string;
}

export interface HistoryEntry {
  id: string;
  orgId: string;
  userId: string;
  entityId: string;
  entityType: string;
  action: string;
  oldValue?: any;
  newValue?: any;
  description?: string;
  createdAt: string;
}

export interface ChartConfig {
  id: string;
  orgId: string;
  name: string;
  type: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
  dataSource: string;
  filters?: any;
  options?: any;
  isPublic: boolean;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  orgId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high';
  status: 'unread' | 'read' | 'archived';
  actionUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tour {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  steps: TourStep[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  order: number;
}

export interface AnalyticsEvent {
  id: string;
  orgId: string;
  userId?: string;
  eventName: string;
  eventData?: Record<string, any>;
  createdAt: string;
}

export interface AnalyticsReport {
  id: string;
  orgId: string;
  eventName: string;
  count: number;
  uniqueUsers: number;
  dateRange: { startDate: string; endDate: string };
  generatedAt: string;
}

export interface Token {
  id: string;
  orgId: string;
  userId: string;
  token: string;
  name: string;
  lastUsedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PDFDocument {
  id: string;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
}

export interface Reminder {
  id: string;
  orgId: string;
  userId: string;
  title: string;
  description?: string;
  reminderDate: string;
  type: 'email' | 'push' | 'in-app';
  status: 'pending' | 'sent' | 'snoozed' | 'dismissed';
  entityId?: string;
  entityType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Timeline {
  id: string;
  orgId: string;
  entityId: string;
  entityType: string;
  actorId: string;
  actorName: string;
  action: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface AIRequest {
  id: string;
  orgId: string;
  userId: string;
  prompt: string;
  response?: string;
  status: 'pending' | 'completed' | 'failed';
  model: string;
  tokens?: { input: number; output: number };
  createdAt: string;
  updatedAt: string;
}

export interface DemoData {
  id: string;
  orgId: string;
  dataType: string;
  count: number;
  createdAt: string;
}

export interface Information {
  id: string;
  orgId: string;
  title: string;
  content: string;
  category: string;
  order: number;
  isPublished: boolean;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  orgId: string;
  title: string;
  body: string;
  contentType: string;
  tags?: string[];
  author?: string;
  status: 'draft' | 'published' | 'archived';
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
