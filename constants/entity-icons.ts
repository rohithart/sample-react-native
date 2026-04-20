import {
    AlarmClock,
    AlertCircle,
    Archive,
    ArchiveRestore,
    ArrowUpDown,
    Banknote,
    BookOpen,
    Building2,
    Calendar,
    CalendarDays,
    CalendarPlus,
    ChartBar,
    ChartPie,
    Check,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Circle,
    Clock,
    Download,
    Edit,
    Eye,
    FileCheck,
    FileDown,
    File as FileIcon,
    FileImage,
    FileSpreadsheet,
    FileText,
    FileVideo,
    Folder,
    GitBranch,
    Globe,
    Hand,
    HelpCircle,
    History as HistoryIcon,
    Home,
    ImageIcon,
    Info,
    ListChecks,
    Lock,
    LogOut,
    Mail,
    MapPin,
    Megaphone,
    Menu,
    MessageSquare,
    MessagesSquare,
    Moon,
    MoreVertical,
    Paperclip,
    Phone,
    PiggyBank,
    Plus,
    PlusCircle,
    Receipt,
    RefreshCw,
    Rocket,
    Save,
    Search,
    Send,
    Settings,
    Share2,
    Shield,
    Smile,
    Sparkles,
    Sun,
    Tag,
    ThumbsUp,
    Trash2,
    TriangleAlert,
    User,
    UserPlus,
    Users,
    UsersRound,
    Video,
    Warehouse,
    Wrench,
    X,
    Zap
} from 'lucide-react-native';
import type { ComponentType } from 'react';

type IconComponent = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

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
  | 'organisation'
  | 'reminder'
  | 'transaction'
  | 'dashboard'
  | 'home'
  | 'help'
  | 'mySpace'
  | 'gallery'
  | 'attachment'
  | 'incomeStatement'
  | 'rocket'
  | 'sparkles'
  | 'zap'
  | 'shield'
  | 'archive'
  | 'lock'
  | 'back'
  | 'smile'
  | 'eye'
  | 'moon'
  | 'sun'
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
  | 'save'
  | 'warning';

export const ENTITY_ICONS: Record<EntityIconKey, IconComponent> = {
  workflow: GitBranch,
  task: ListChecks,
  evidence: FileCheck,
  category: Tag,
  vendor: Building2,
  quote: Receipt,
  workorder: Wrench,
  invoice: FileText,
  announcement: Megaphone,
  meeting: Video,
  vote: ThumbsUp,
  userRequest: Hand,
  booking: CalendarPlus,
  bookingType: Tag,
  asset: Warehouse,
  assetType: Tag,
  document: Folder,
  event: CalendarDays,
  eventType: Tag,
  information: Info,
  group: Users,
  user: User,
  financialYear: CalendarDays,
  chartOfAccount: ChartBar,
  budget: PiggyBank,
  ledger: BookOpen,
  wall: MessagesSquare,
  organisation: Building2,
  reminder: AlarmClock,
  transaction: Banknote,
  dashboard: ChartPie,
  home: Home,
  help: HelpCircle,
  mySpace: User,
  gallery: ImageIcon,
  attachment: Paperclip,
  incomeStatement: ArrowUpDown,
  rocket: Rocket,
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  archive: Archive,
  lock: Lock,
  back: ChevronLeft,
  eye: Eye,
  moon: Moon,
  sun: Sun,
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
  smile: Smile,
  trash: Trash2,
  userPlus: UserPlus,
  usersRound: UsersRound,
  save: Save,
  warning: TriangleAlert,
};
