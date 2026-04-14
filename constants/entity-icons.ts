import {
    Bell,
    Bookmark,
    BookOpen,
    BoxIcon,
    Building2,
    CalendarDays,
    ClipboardList,
    FileText,
    Folder,
    GitBranch,
    Info,
    PiggyBank,
    Radio,
    Receipt,
    Tag,
    ThumbsUp,
    TrendingUp,
    Users,
    Video,
    Wrench,
} from 'lucide-react-native';
import type { ComponentType } from 'react';

// ---------------------------------------------------------------------------
// Icon type — works regardless of lucide-react-native version
// ---------------------------------------------------------------------------
type IconComponent = ComponentType<{ size?: number; color?: string }>;

// ---------------------------------------------------------------------------
// Entity icon key — every entity that can appear in a list or card
// ---------------------------------------------------------------------------
export type EntityIconKey =
  | 'workflow'
  | 'task'
  | 'evidence'
  | 'category'
  | 'vendor'
  | 'quote'
  | 'workorder'
  | 'invoice'
  | 'announcement'
  | 'meeting'
  | 'vote'
  | 'userRequest'
  | 'booking'
  | 'bookingType'
  | 'asset'
  | 'assetType'
  | 'document'
  | 'event'
  | 'eventType'
  | 'information'
  | 'group'
  | 'user'
  | 'financialYear'
  | 'chartOfAccount'
  | 'budget'
  | 'ledger'
  | 'wall'
  | 'reminder';

// ---------------------------------------------------------------------------
// Icon map — single source of truth, same icons as the navigation drawers
// ---------------------------------------------------------------------------
export const ENTITY_ICONS: Record<EntityIconKey, IconComponent> = {
  workflow: GitBranch,
  task: ClipboardList,
  evidence: FileText,
  category: Tag,
  vendor: Building2,
  quote: Receipt,
  workorder: Wrench,
  invoice: FileText,
  announcement: FileText,
  meeting: Video,
  vote: ThumbsUp,
  userRequest: Users,
  booking: Bookmark,
  bookingType: Tag,
  asset: BoxIcon,
  assetType: Tag,
  document: Folder,
  event: CalendarDays,
  eventType: Tag,
  information: Info,
  group: Users,
  user: Users,
  financialYear: CalendarDays,
  chartOfAccount: TrendingUp,
  budget: PiggyBank,
  ledger: BookOpen,
  wall: Radio,
  reminder: Bell,
};
