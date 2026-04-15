import {
    AlertCircle,
    Archive,
    ArchiveRestore,
    BarChart3,
    Bell,
    Bookmark,
    BookOpen,
    BoxIcon,
    Building2,
    Calendar,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Circle,
    ClipboardList,
    Clock,
    Download,
    Edit,
    Eye,
    FileDown,
    File as FileIcon,
    FileImage,
    FileSpreadsheet,
    FileText,
    FileVideo,
    Folder,
    GitBranch,
    Globe,
    HelpCircle,
    History as HistoryIcon,
    Home,
    ImageIcon,
    Info,
    LogOut,
    Mail,
    MapPin,
    Menu,
    MessageSquare,
    Moon,
    MoreVertical,
    Paperclip,
    Phone,
    PiggyBank,
    Plus,
    PlusCircle,
    Radio,
    Receipt,
    RefreshCw,
    Rocket,
    Search,
    Send,
    Settings,
    Share2,
    Shield,
    Sparkles,
    Sun,
    Tag,
    ThumbsUp,
    Trash2,
    TrendingUp,
    TriangleAlert,
    User,
    UserPlus,
    Users,
    UsersRound,
    Video,
    Wrench,
    X,
    Zap
} from 'lucide-react-native';
import type { ComponentType } from 'react';

// ---------------------------------------------------------------------------
// Icon type — works regardless of lucide-react-native version
// ---------------------------------------------------------------------------
type IconComponent = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

// ---------------------------------------------------------------------------
// Entity icon key — every entity that can appear in a list or card
// ---------------------------------------------------------------------------
export type EntityIconKey =
  // Entities
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
  | 'organisation'
  | 'reminder'
  | 'transaction'
  // Navigation / layout
  | 'dashboard'
  | 'home'
  | 'help'
  | 'mySpace'
  | 'gallery'
  | 'attachment'
  | 'incomeStatement'
  // Splash / branding
  | 'rocket'
  | 'sparkles'
  | 'zap'
  | 'shield'
  // Settings
  | 'archive'
  | 'back'
  | 'eye'
  | 'moon'
  | 'sun'
  // Action icons
  | 'alertCircle'
  | 'archiveRestore'
  | 'calendar'
  | 'check'
  | 'checkCircle'
  | 'chevronDown'
  | 'chevronRight'
  | 'circle'
  | 'clock'
  | 'close'
  | 'comment'
  | 'download'
  | 'edit'
  | 'file'
  | 'fileDown'
  | 'fileImage'
  | 'fileSpreadsheet'
  | 'fileText'
  | 'fileVideo'
  | 'globe'
  | 'history'
  | 'logOut'
  | 'mail'
  | 'mapPin'
  | 'menu'
  | 'moreVertical'
  | 'phone'
  | 'plus'
  | 'plusCircle'
  | 'refresh'
  | 'search'
  | 'send'
  | 'settings'
  | 'share'
  | 'trash'
  | 'userPlus'
  | 'usersRound'
  | 'warning';

// ---------------------------------------------------------------------------
// Icon map — single source of truth for ALL icons used in the app
// ---------------------------------------------------------------------------
export const ENTITY_ICONS: Record<EntityIconKey, IconComponent> = {
  // Entities
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
  user: User,
  financialYear: CalendarDays,
  chartOfAccount: TrendingUp,
  budget: PiggyBank,
  ledger: BookOpen,
  wall: Radio,
  organisation: Building2,
  reminder: Bell,
  transaction: FileText,
  // Navigation / layout
  dashboard: BarChart3,
  home: Home,
  help: HelpCircle,
  mySpace: Users,
  gallery: ImageIcon,
  attachment: Paperclip,
  incomeStatement: TrendingUp,
  // Splash / branding
  rocket: Rocket,
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  // Settings
  archive: Archive,
  back: ChevronLeft,
  eye: Eye,
  moon: Moon,
  sun: Sun,
  // Action icons
  alertCircle: AlertCircle,
  archiveRestore: ArchiveRestore,
  calendar: Calendar,
  check: Check,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  circle: Circle,
  clock: Clock,
  close: X,
  comment: MessageSquare,
  download: Download,
  edit: Edit,
  file: FileIcon,
  fileDown: FileDown,
  fileImage: FileImage,
  fileSpreadsheet: FileSpreadsheet,
  fileText: FileText,
  fileVideo: FileVideo,
  globe: Globe,
  history: HistoryIcon,
  logOut: LogOut,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  moreVertical: MoreVertical,
  phone: Phone,
  plus: Plus,
  plusCircle: PlusCircle,
  refresh: RefreshCw,
  search: Search,
  send: Send,
  settings: Settings,
  share: Share2,
  trash: Trash2,
  userPlus: UserPlus,
  usersRound: UsersRound,
  warning: TriangleAlert,
};
