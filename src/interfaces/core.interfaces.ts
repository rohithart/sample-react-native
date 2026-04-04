/**
 * Core Interfaces - User, Organisation, Auth, Dashboard
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VIEWER = 'VIEWER',
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  organisationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organisation {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganisationMember {
  id: string;
  orgId: string;
  userId: string;
  role: string;
  joinedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

export interface Dashboard {
  id: string;
  title: string;
  description: string;
  organisationId: string;
  widgets: DashboardWidget[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'stat' | 'table' | 'calendar';
  title: string;
  data?: any;
}

export interface ChatMessage {
  id: string;
  organisationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  avatar?: string;
}
