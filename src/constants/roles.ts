import { UserRole } from '@types/index';

export const USER_ROLES = {
  ADMIN: UserRole.ADMIN,
  USER: UserRole.USER,
  VIEWER: UserRole.VIEWER,
};

// Admin-specific routes/features
export const ADMIN_ONLY_FEATURES = [
  'user_management',
  'organization_settings',
  'billing',
  'audit_logs',
  'reports_admin',
];

// User and above features
export const USER_AND_ABOVE_FEATURES = [
  'dashboard_user',
  'tasks',
  'messages',
  'documents',
];

// Viewer and above features
export const VIEWER_AND_ABOVE_FEATURES = [
  'dashboard_view',
  'view_reports',
  'view_documents',
];
