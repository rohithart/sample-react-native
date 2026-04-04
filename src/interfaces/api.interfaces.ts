/**
 * API Response Interfaces - Common API types
 */

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface NotificationPayload {
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
  data?: any;
  errors?: Record<string, string[]>;
}
