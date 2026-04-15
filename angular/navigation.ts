import { BusinessModule } from '@propordo/models/dist/enum';
import { Organisation } from 'src/app/interfaces';
import { NavigationItem } from 'src/app/interfaces/NavigationItem';

export const AdminNavigationItems = (org: Organisation): NavigationItem[] => [
  {
    id: 'org-module',
    title: 'Organisations',
    type: 'group',
    icon: 'fas fa-module',
    classes: 'bg-success-subtle rounded-3 m-2',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'all-org',
        title: 'All organisations',
        type: 'item',
        classes: 'nav-item',
        url: `/organisations`,
        icon: 'fas fa-building'
      },
      {
        id: 'add-org',
        title: 'New organisation',
        type: 'item',
        classes: 'nav-item',
        url: `/organisation/new`,
        icon: 'fas fa-plus'
      }
    ]
  },
  {
    id: 'this-org-module',
    title: `${org.name}`,
    type: 'group',
    icon: 'fas fa-module',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'org',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/${org._id}`,
        icon: 'fas fa-pie-chart'
      },
      {
        id: 'me',
        title: 'My space',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/me/${org._id}`,
        icon: 'far fa-user'
      },
      {
        id: 'wall',
        title: 'Discussions',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/discussion/${org._id}`,
        icon: 'fas fa-comments'
      }
    ]
  },
  {
    id: 'workflow-module',
    title: 'Workflows',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.WORKFLOW,
    children: [
      {
        id: 'workflows',
        title: 'Workflows',
        type: 'collapse',
        icon: 'fas fa-diagram-project',
        children: [
          {
            id: 'all-workflows',
            title: 'All workflows',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/workflows/${org._id}`,
            icon: 'fas fa-diagram-project'
          },
          {
            id: 'category',
            title: 'Categories',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/categories/${org._id}`,
            icon: 'fas fa-tag'
          }
        ]
      },
      {
        id: 'tasks',
        title: 'Tasks',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/tasks/${org._id}`,
        icon: 'fas fa-list-check'
      },
      {
        id: 'evidences',
        title: 'Evidences',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/evidences/${org._id}`,
        icon: 'fas fa-spell-check'
      },
      {
        id: 'status',
        title: 'Status',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/status/workflow/${org._id}`,
        icon: 'fas fa-bars-progress'
      }
    ]
  },
  {
    id: 'vendor-module',
    title: 'Vendors',
    type: 'group',
    icon: 'fas fa-building',
    collapsed: true,
    module: BusinessModule.VENDOR,
    children: [
      {
        id: 'vendors',
        title: 'Vendors',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/vendors/${org._id}`,
        icon: 'fas fa-building'
      },
      {
        id: 'quotes',
        title: 'Quotes',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/quotes/${org._id}`,
        icon: 'fas fa-receipt'
      },
      {
        id: 'workorders',
        title: 'Work orders',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/workorders/${org._id}`,
        icon: 'fas fa-screwdriver-wrench'
      },
      {
        id: 'invoices',
        title: 'Invoices',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/invoices/${org._id}`,
        icon: 'fas fa-file-invoice-dollar'
      },
      {
        id: 'status',
        title: 'Status',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/status/vendor/${org._id}`,
        icon: 'fas fa-bars-progress'
      }
    ]
  },
  {
    id: 'comm-module',
    title: 'Communication',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.COMMUNICATION,
    children: [
      {
        id: 'announcement',
        title: 'Announcements',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/announcements/${org._id}`,
        icon: 'fas fa-bullhorn'
      },
      {
        id: 'meetings',
        title: 'Meetings',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/meetings/${org._id}`,
        icon: 'fas fa-video'
      },
      {
        id: 'votes',
        title: 'Votes',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/votes/${org._id}`,
        icon: 'fas fa-square-poll-vertical'
      },
      {
        id: 'requests',
        title: 'User requests',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/user-requests/${org._id}`,
        icon: 'fas fa-hand'
      },
      {
        id: 'reminders',
        title: 'Reminders',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/reminders/${org._id}`,
        icon: 'fas fa-alarm-clock'
      },
      {
        id: 'bookings',
        title: 'Bookings',
        type: 'collapse',
        icon: 'fas fa-calendar-plus',
        children: [
          {
            id: 'all-booking',
            title: 'All bookings',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/bookings/${org._id}`,
            icon: 'fas fa-calendar-plus'
          },
          {
            id: 'bookingType',
            title: 'Booking type',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/booking-types/${org._id}`,
            icon: 'fas fa-tag'
          }
        ]
      }
    ]
  },
  {
    id: 'asset-module',
    title: 'Asset Management',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.ASSET,
    children: [
      {
        id: 'assets',
        title: 'Assets',
        type: 'collapse',
        icon: 'fas fa-warehouse',
        children: [
          {
            id: 'all-assets',
            title: 'All assets',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/assets/${org._id}`,
            icon: 'fas fa-warehouse'
          },
          {
            id: 'assetType',
            title: 'Asset type',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/asset-types/${org._id}`,
            icon: 'fas fa-tag'
          }
        ]
      },
      {
        id: 'documents',
        title: 'Document store',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/documents/${org._id}`,
        icon: 'fas fa-file'
      }
    ]
  },
  {
    id: 'finance-module',
    title: 'Finance',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.FINANCE,
    children: [
      {
        id: 'fy',
        title: 'Financial year',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/financial-years/${org._id}`,
        icon: 'fas fa-calendar-days'
      },
      {
        id: 'coa',
        title: 'Chart of Accounts',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/chart-of-accounts/${org._id}`,
        icon: 'fas fa-chart-simple'
      },
      {
        id: 'budget',
        title: 'Budgets',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/budgets/${org._id}`,
        icon: 'fas fa-piggy-bank'
      },
      {
        id: 'ledgers',
        title: 'Ledgers',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/ledgers/${org._id}`,
        icon: 'fas fa-money-bill-transfer'
      },
      {
        id: 'transactions',
        title: 'Transactions',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/transactions/${org._id}`,
        icon: 'fas fa-money-check-dollar'
      }
    ]
  },
  {
    id: 'analytics-module',
    title: 'Analytics',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.ANALYTICS,
    children: [
      {
        id: 'analytics',
        title: 'Workflow',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/analytics/${org._id}`,
        icon: 'fas fa-chart-line'
      },
      {
        id: 'balanceSheet',
        title: 'Balance sheet',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/analytics/balance-sheet/${org._id}`,
        icon: 'fas fa-scale-balanced'
      },
      {
        id: 'incomeExpense',
        title: 'Income statement',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/analytics/income-expense/${org._id}`,
        icon: 'fas fa-arrows-up-down'
      }
    ]
  },
  {
    id: 'gallery-module',
    title: 'Attachments',
    type: 'group',
    icon: 'fas fa-images',
    collapsed: true,
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'images',
        title: 'All images',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/images/${org._id}`,
        icon: 'fas fa-image'
      },
      {
        id: 'attachments',
        title: 'All attachments',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/attachments/${org._id}`,
        icon: 'fas fa-paperclip'
      }
    ]
  },
  {
    id: 'users-module',
    title: 'Users & Groups',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.USER,
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/users/${org._id}`,
        icon: 'fas fa-user'
      },
      {
        id: 'groups',
        title: 'Groups',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/groups/${org._id}`,
        icon: 'fas fa-user-group'
      }
    ]
  },
  {
    id: 'general-module',
    title: 'General',
    type: 'group',
    icon: 'fas fa-module',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'events',
        title: 'Events',
        type: 'collapse',
        icon: 'fas fa-calendar-days',
        children: [
          {
            id: 'all-events',
            title: 'All events',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/events/${org._id}`,
            icon: 'fas fa-calendar-days'
          },
          {
            id: 'eventType',
            title: 'Event type',
            type: 'item',
            classes: 'nav-item',
            url: `/admin/event-types/${org._id}`,
            icon: 'fas fa-tag'
          }
        ]
      },
      {
        id: 'information',
        title: 'Other information',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/informations/${org._id}`,
        icon: 'fas fa-circle-info'
      },
      {
        id: 'help',
        title: 'Help',
        type: 'item',
        classes: 'nav-item',
        url: `/admin/help`,
        icon: 'fas fa-circle-question'
      }
    ]
  }
];

export const UserNavigationItems = (org: Organisation): NavigationItem[] => [
  {
    id: 'org-module',
    title: 'Organisations',
    type: 'group',
    icon: 'fas fa-module',
    classes: 'bg-success-subtle rounded-3 m-2',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'all-org',
        title: 'All organisations',
        type: 'item',
        classes: 'nav-item',
        url: `/organisations`,
        icon: 'fas fa-building'
      },
      {
        id: 'add-org',
        title: 'New organisation',
        type: 'item',
        classes: 'nav-item',
        url: `/organisation/new`,
        icon: 'fas fa-plus'
      }
    ]
  },
  {
    id: 'this-org-module',
    title: `${org.name}`,
    type: 'group',
    icon: 'fas fa-module',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'org',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: `/view/${org._id}`,
        icon: 'fas fa-pie-chart'
      },
      {
        id: 'wall',
        title: 'Discussions',
        type: 'item',
        classes: 'nav-item',
        url: `/view/discussion/${org._id}`,
        icon: 'fas fa-comments'
      },
      {
        id: 'admins',
        title: 'Admins',
        type: 'item',
        classes: 'nav-item',
        url: `/view/admins/${org._id}`,
        icon: 'fas fas fa-user'
      }
    ]
  },
  {
    id: 'your-module',
    title: 'My space',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.COMMUNICATION,
    children: [
      {
        id: 'your-groups',
        title: 'My groups',
        type: 'item',
        classes: 'nav-item',
        url: `/view/groups/${org._id}`,
        icon: 'fas fas fa-user-group'
      },
      {
        id: 'booking',
        title: 'My bookings',
        type: 'item',
        classes: 'nav-item',
        url: `/view/bookings/${org._id}`,
        icon: 'fas fa-calendar-plus'
      },
      {
        id: 'requests',
        title: 'My requests',
        type: 'item',
        classes: 'nav-item',
        url: `/view/user-requests/${org._id}`,
        icon: 'fas fa-hand'
      }
    ]
  },
  {
    id: 'comm-module',
    title: 'Communication',
    type: 'group',
    icon: 'fas fa-module',
    collapsed: true,
    module: BusinessModule.COMMUNICATION,
    children: [
      {
        id: 'announcement',
        title: 'Announcements',
        type: 'item',
        classes: 'nav-item',
        url: `/view/announcements/${org._id}`,
        icon: 'fas fa-bullhorn'
      },
      {
        id: 'meetings',
        title: 'Meetings',
        type: 'item',
        classes: 'nav-item',
        url: `/view/meetings/${org._id}`,
        icon: 'fas fa-video'
      },
      {
        id: 'votes',
        title: 'Votes',
        type: 'item',
        classes: 'nav-item',
        url: `/view/votes/${org._id}`,
        icon: 'fas fa-square-poll-vertical'
      }
    ]
  },
  {
    id: 'general-module',
    title: 'General',
    type: 'group',
    icon: 'fas fa-module',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'events',
        title: 'Organisation events',
        type: 'item',
        classes: 'nav-item',
        url: `/view/events/${org._id}`,
        icon: 'fas fa-calendar-days'
      },
      {
        id: 'information',
        title: 'Other information',
        type: 'item',
        classes: 'nav-item',
        url: `/view/informations/${org._id}`,
        icon: 'fas fa-circle-info'
      },
      {
        id: 'help',
        title: 'Help',
        type: 'item',
        classes: 'nav-item',
        url: `/view/help`,
        icon: 'fas fa-circle-question'
      }
    ]
  }
];

export const OrgNavigationItems: NavigationItem[] = [
  {
    id: 'org-module',
    title: 'Organisations',
    type: 'group',
    icon: 'fas fa-module',
    classes: 'rounded-3 m-2',
    module: BusinessModule.GENERAL,
    children: [
      {
        id: 'all-org',
        title: 'All organisations',
        type: 'item',
        classes: 'nav-item',
        url: `/organisations`,
        icon: 'fas fa-building'
      },
      {
        id: 'add-org',
        title: 'New organisation',
        type: 'item',
        classes: 'nav-item',
        url: `/organisation/new`,
        icon: 'fas fa-plus'
      }
    ]
  }
];
