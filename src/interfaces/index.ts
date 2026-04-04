/**
 * Centralized Interfaces Export
 * All interfaces are organized by domain and exported here
 */

// Core Interfaces
export * from './core.interfaces';

// Entity Interfaces
export * from './entity.interfaces';

// Operational Interfaces
export * from './operational.interfaces';

// Financial Interfaces
export * from './financial.interfaces';

// Communication Interfaces
export * from './communication.interfaces';

// Asset Interfaces
export * from './asset.interfaces';

// Utility Interfaces
export * from './utility.interfaces';

// Context & Settings Interfaces
export * from './context.interfaces';

// API Response Interfaces
export * from './api.interfaces';

// Re-export all types for convenience
export type {
  // Core
  User,
  Organisation,
  OrganisationMember,
  AuthState,
  Dashboard,
  DashboardWidget,
  ChatMessage,
  // Entity
  Task,
  Vendor,
  Invoice,
  Quote,
  Workorder,
  DocumentStore,
  Transaction,
  Message,
  // Operational
  Conversation,
  Comment,
  Workflow,
  Group,
  Booking,
  Meeting,
  Event,
  Folder,
  // Financial
  FinancialYear,
  Budget,
  Category,
  ChartOfAccount,
  Status,
  TransactionEntry,
  // Communication
  Announcement,
  Newsletter,
  Email,
  Wall,
  Vote,
  Poll,
  // Asset
  Asset,
  AssetType,
  Attachment,
  Evidence,
  Image,
  // Utility
  SearchResult,
  HistoryEntry,
  ChartConfig,
  Alert,
  Tour,
  TourStep,
  AnalyticsEvent,
  AnalyticsReport,
  Token,
  PDFDocument,
  Reminder,
  Timeline,
  AIRequest,
  DemoData,
  Information,
  Content,
  FirebaseConfig,
  // Context
  UserContext,
  OrganisationContext,
  UISettings,
  SettingsContext,
  AdminOrganisation,
  BookingType,
  EventType,
  VendorComment,
  VendorSubmission,
  // API
  ApiResponse,
  PaginatedResponse,
  NotificationPayload,
  ErrorResponse,
} from './index';

// Re-export enums
export { UserRole, NotificationType } from './core.interfaces';
export { NotificationType as ApiNotificationType } from './api.interfaces';
