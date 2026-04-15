export { AIResponse, Alert, Announcement, AppNotification, Asset, AssetType, Booking, BookingType, Budget, Category, ChartOfAccount, Comment, Conversation, DocumentStore, Event, EventType, Evidence, FinancialYear, Folder, Group, GroupUser, History, Information, Invoice, Meeting, Message, OrgAccess, Organisation, Quote, Reminder, Task, Timeline, Token, Transaction, TransactionEntry, User, UserRequest, UserRole, UserVote, Vendor, VendorComment, Vote, Wall, Workflow, Workorder } from '@propordo/models/dist/ui';
export type { File as Attachment } from '@propordo/models/dist/ui';
export type { File as AppImage } from '@propordo/models/dist/ui';
export interface HistoryChanges {
  field: string;
  oldValue?: unknown;
  newValue?: unknown;
}
