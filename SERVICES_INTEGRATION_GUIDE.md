# React Native Services Integration Guide

## Overview

This comprehensive services layer provides seamless integration between your React Native application and the backend REST API. All 57 Angular services have been converted to async/await Promise-based services compatible with React Native.

## Architecture

### Core Concepts

1. **Service Classes**: Each service is a singleton class with methods for CRUD operations
2. **Promise-Based**: All methods return `Promise<ApiResponse<T>>` instead of RxJS Observables
3. **Error Handling**: Errors are handled through Axios interceptors (see `src/utils/apiClient.ts`)
4. **Organization-Scoped**: Most services support multi-tenant operations with `orgId` parameter
5. **Type Safety**: Full TypeScript interfaces for all entities

### Project Structure

```
src/services/
├── index.ts                          # Main export file
├── user.service.ts                   # User management (CRUD, roles, groups)
├── organisation.service.ts           # Organisation management
├── auth.service.ts                   # Authentication operations
├── dashboard.service.ts              # Dashboard data
├── chat.service.ts                   # Real-time chat (Firebase)
├── notification.service.ts           # Notifications
├── task.service.ts                   # Task management (workflow integration)
├── vendor.service.ts                 # Vendor management
├── invoice.service.ts                # Financial documents
├── quote.service.ts                  # Quotations
├── workorder.service.ts              # Work orders
├── document.service.ts               # Document management
├── transaction.service.ts            # Financial transactions
├── message.service.ts                # Direct messaging
├── conversation.service.ts           # Message threads
├── comment.service.ts                # Entity comments
├── workflow.service.ts               # Business workflows
├── group.service.ts                  # User groups
├── booking.service.ts                # Resource bookings
├── meeting.service.ts                # Meeting scheduling
├── event.service.ts                  # Event management
├── folder.service.ts                 # Document folders
├── financialYear.service.ts          # Fiscal year management
├── budget.service.ts                 # Budget planning
├── category.service.ts               # Category management
├── chartOfAccount.service.ts         # Accounting chart
├── status.service.ts                 # Status types
├── transactionEntry.service.ts       # Transaction entries
├── announcement.service.ts           # Organization announcements
├── newsletter.service.ts             # Newsletter management
├── email.service.ts                  # Email service
├── wall.service.ts                   # Social wall
├── vote.service.ts                   # Voting system
├── asset.service.ts                  # Asset management (depreciation)
├── assetType.service.ts              # Asset type definitions
├── attachment.service.ts             # File attachments
├── evidence.service.ts               # Evidence collection
├── image.service.ts                  # Image uploads
├── search.service.ts                 # Global search
├── history.service.ts                # Audit history
├── chart.service.ts                  # Chart configuration
├── alert.service.ts                  # Alert system
├── tour.service.ts                   # Application tours
├── analytics.service.ts              # Analytics tracking
├── token.service.ts                  # Token management
├── pdf.service.ts                    # PDF generation
├── reminder.service.ts               # Reminders
├── timeline.service.ts               # Activity timeline
├── ai.service.ts                     # AI operations
├── demo.service.ts                   # Demo data generation
├── information.service.ts            # Information management
├── content.service.ts                # Content management
├── firebase.service.ts               # Firebase operations
├── vendorComment.service.ts          # Vendor ratings/comments
├── vendorSubmit.service.ts           # Vendor submissions
├── bookingType.service.ts            # Booking type definitions
├── eventType.service.ts              # Event type definitions
├── userContext.service.ts            # User context & permissions
├── organisationContext.service.ts    # Organization context
├── settingsUI.service.ts             # UI settings
├── settingsContext.service.ts        # Organization settings
└── admin-organisation.service.ts     # Admin operations

```

## Service Categories

### 1. Core Services (5 services)
- **userService**: User CRUD, roles, group membership
- **organisationService**: Organization CRUD and member management
- **authService**: Authentication and session management
- **dashboardService**: Dashboard queries (org/user specific)
- **chatService**: Real-time Firebase Firestore chat

### 2. Entity Management Services (8 services)
Core business entities with full CRUD + advanced operations:

- **taskService**: Tasks with workflow integration, archiving, flags
- **vendorService**: Vendor management with archive capabilities
- **invoiceService**: Financial documents, status tracking, reminders
- **quoteService**: Quote management, approval workflows
- **workorderService**: Work order execution and tracking
- **documentService**: Document management with folders
- **transactionService**: Financial transactions, date ranges
- **messageService**: Direct messaging with reactions

### 3. Operational Services (8 services)
Support collaboration and workflow:

- **conversationService**: Thread-based conversations
- **commentService**: Comments on any entity
- **workflowService**: Business process definitions and execution
- **groupService**: User group management
- **bookingService**: Resource booking and approval
- **meetingService**: Meeting scheduling and invitations
- **eventService**: Event management with attendees
- **folderService**: Hierarchical folder organization

### 4. Financial Services (6 services)
Complete financial management:

- **financialYearService**: Fiscal year management
- **budgetService**: Budget allocation and tracking
- **categoryService**: Expense/revenue categories
- **chartOfAccountService**: Accounting chart structure
- **statusService**: Status definitions and ordering
- **transactionEntryService**: Double-entry bookkeeping

### 5. Communication Services (5 services)
Organization-wide communication:

- **announcementService**: Announcements to organization
- **newsletterService**: Newsletter creation and distribution
- **emailService**: Email sending with batch support
- **wallService**: Social wall for organization
- **voteService**: Poll/voting system

### 6. Resource Management Services (5 services)
Assets and attachments:

- **assetService**: Asset tracking with depreciation
- **assetTypeService**: Asset type definitions
- **attachmentService**: File upload/download
- **evidenceService**: Evidence collection (photos, files)
- **imageService**: Image upload with thumbnails

### 7. Utility & Analytics Services (11 services)
Platform utilities:

- **searchService**: Global search with advanced filters
- **historyService**: Audit trail logging
- **chartService**: Chart configuration and export
- **alertService**: User alerts and notifications
- **tourService**: In-app guided tours
- **analyticsService**: Event tracking and reporting
- **tokenService**: API token management
- **pdfService**: PDF generation and manipulation
- **reminderService**: Reminders with snooze
- **timelineService**: Activity timeline
- **aiService**: AI-powered features

### 8. Admin & Settings Services (8 services)
Configuration and administration:

- **adminOrganisationService**: Organization administration
- **userContextService**: User context and permissions
- **organisationContextService**: Organization context
- **settingsUIService**: User UI preferences
- **settingsContextService**: Organization settings
- **demoService**: Demo data generation
- **informationService**: Help information
- **contentService**: Content management

### 9. Integration Services (5 services)
Third-party and specialized:

- **firebaseService**: Firebase config and messaging
- **vendorCommentService**: Vendor ratings/comments
- **vendorSubmitService**: Vendor document submissions
- **bookingTypeService**: Booking type definitions
- **eventTypeService**: Event type definitions

## Usage Examples

### Basic CRUD Operations

```typescript
import { taskService, invoiceService } from '@services';

// Create
const newTask = await taskService.create(orgId, {
  title: 'New Task',
  description: 'Task description',
  status: 'pending'
});

// Read
const task = await taskService.get(taskId);
const allTasks = await taskService.getAll(orgId);

// Update
const updated = await taskService.update(taskId, { status: 'in_progress' });

// Delete
await taskService.delete(taskId);
```

### Advanced Queries

```typescript
// Get related entities
const invoices = await invoiceService.getAllForVendor(vendorId);
const workflowTasks = await taskService.getAllForWorkFlow(workflowId);

// Get archived items
const archivedInvoices = await invoiceService.getAllArchived(orgId);

// Date range queries
const transactions = await transactionService.getForRange(orgId, {
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});
```

### Status & Workflow Operations

```typescript
// Update status
await invoiceService.updateStatus(invoiceId, 'approved');

// Archive/Unarchive
await documentService.archive(documentId);
await documentService.unarchive(documentId);

// Workflow actions
await invoiceService.submit(invoiceId);
await invoiceService.remind(invoiceId);
```

### File Operations

```typescript
import { attachmentService, imageService, pdfService } from '@services';

// Upload attachment
const file = new File([...], 'document.pdf', { type: 'application/pdf' });
const attachment = await attachmentService.upload(orgId, entityId, 'invoice', file);

// Upload image
const image = await imageService.upload(orgId, photoFile, 'Profile Picture');

// Generate PDF
const pdf = await pdfService.generateFromTemplate('invoice-template', data);
```

### Real-Time Operations

```typescript
import { chatService, notificationService } from '@services';

// Subscribe to real-time messages
const unsubscribe = chatService.subscribeToMessages(
  conversationId,
  (messages) => {
    console.log('New messages:', messages);
  }
);

// Send message
await chatService.sendMessage(conversationId, 'Hello!');

// Mark as read
await chatService.markMessageRead(messageId);

// Clean up subscription
unsubscribe();
```

### Search & Global Operations

```typescript
import { searchService, analyticsService } from '@services';

// Global search
const results = await searchService.search(orgId, 'invoice 2024');

// Advanced search by type
const userResults = await searchService.searchByType(orgId, 'john', 'user');

// Track analytics
await analyticsService.trackEvent(orgId, 'invoice_created', {
  vendor: vendorId,
  amount: 5000
});
```

### Context & Settings

```typescript
import { userContextService, settingsUIService } from '@services';

// Get user context
const context = await userContextService.getCurrentUserContext();

// Check permissions
const canEdit = await userContextService.hasPermission(userId, orgId, 'edit_invoice');

// Update UI settings
await settingsUIService.updateTheme(userId, 'dark');
```

## Error Handling

All services use the centralized Axios error handler configured in `src/utils/apiClient.ts`:

```typescript
try {
  const task = await taskService.get(taskId);
} catch (error) {
  // Error is already formatted by interceptor
  // Contains: error.response.status, error.response.data.message
  console.error('Error:', error.message);
}
```

## Performance Considerations

### Pagination
Some services support pagination for large datasets:

```typescript
const messages = await messageService.getMessagesForConversation(
  conversationId,
  50,    // limit
  0      // skip
);
```

### Batch Operations
Email and image services support batch operations:

```typescript
const emails = await emailService.sendBatch(orgId, [
  { recipientEmail: 'user1@example.com', subject: '...', body: '...' },
  { recipientEmail: 'user2@example.com', subject: '...', body: '...' }
]);
```

### Caching Strategy
For frequently accessed data, implement caching in Zustand stores:

```typescript
// In store
const getUserData = async (userId: string) => {
  if (cache[userId]) return cache[userId];
  const data = await userService.get(userId);
  cache[userId] = data;
  return data;
};
```

## Related Documentation

- **API Client**: See `src/utils/apiClient.ts` for request/response interceptors
- **Types**: See `src/types/index.ts` for all TypeScript interfaces
- **Zustand Stores**: See `src/stores/` for state management examples
- **Hooks**: See `src/hooks/` for custom hooks using services

## Common Patterns

### Loading State Management
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const loadTasks = async () => {
  setLoading(true);
  try {
    const tasks = await taskService.getAll(orgId);
    setTasks(tasks.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Mutation Pattern
```typescript
const handleCreateInvoice = async (data) => {
  try {
    const result = await invoiceService.create(orgId, data);
    // Update local state/store
    showSuccessToast('Invoice created');
  } catch (error) {
    showErrorToast(error.message);
  }
};
```

## Migration Notes

All services have been converted from Angular's HttpClient + RxJS to Promise-based async/await:

### Before (Angular)
```typescript
// Angular
return this.http.get(`/invoice/${orgId}`).pipe(
  map(response => response.data),
  catchError(error => throwError(error))
);
```

### After (React Native)
```typescript
// React Native
async getAll(orgId: string): Promise<ApiResponse<Invoice[]>> {
  return apiClient.get(`/invoice/org/${orgId}`);
}
```

## Best Practices

1. **Always use orgId**: All organization-specific operations require `orgId`
2. **Handle errors**: Use try-catch or error callbacks for all async calls
3. **Clean up subscriptions**: Unsubscribe from real-time listeners when component unmounts
4. **Cache data**: Use Zustand stores to cache frequently accessed data
5. **Batch operations**: Use batch methods for bulk operations
6. **Type safety**: Always use the service interfaces for type safety

## Support

For issues or questions about services:
1. Check the service interface for method signatures
2. Review the API client configuration in `src/utils/apiClient.ts`
3. Consult the TypeScript interfaces in `src/types/index.ts`
4. Refer to the store implementations in `src/stores/`
