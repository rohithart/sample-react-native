# Services Quick Reference

## Service Overview

| Service | Type | Key Operations | Key Features |
|---------|------|-----------------|--------------|
| **userService** | Core | CRUD, Roles, Groups | Profile management |
| **organisationService** | Core | CRUD, Members, Access | Multi-tenant support |
| **authService** | Core | Login, Logout, Token | Session management |
| **dashboardService** | Core | Query | Org/User dashboards |
| **taskService** | Entity | CRUD+, Status, Archive, Flag | Workflow integration |
| **invoiceService** | Entity | CRUD+, Status, Submit, Remind | Financial management |
| **quoteService** | Entity | CRUD+, Extend, Approve | Quote workflow |
| **workorderService** | Entity | CRUD+, Status, Submit | Work execution |
| **vendorService** | Entity | CRUD, Archive | Vendor management |
| **documentService** | Entity | CRUD+, Move, Archive | Document storage |
| **messageService** | Entity | Send, Read, React, Delete | Direct messaging |
| **transactionService** | Entity | Range Query, Create, Archive | Financial tracking |
| **conversationService** | Operational | CRUD+, Participants | Thread management |
| **commentService** | Operational | CRUD, Entity-scoped | Comments on entities |
| **workflowService** | Operational | CRUD+, Steps | Process definitions |
| **groupService** | Operational | CRUD+, Members | Team management |
| **bookingService** | Operational | CRUD+, Approve, Reject | Resource booking |
| **meetingService** | Operational | CRUD+, Attendees, Record | Event scheduling |
| **eventService** | Operational | CRUD+, Attendees | Event management |
| **folderService** | Operational | CRUD+, Move | Folder structure |
| **financialYearService** | Financial | CRUD, Open/Close | Period management |
| **budgetService** | Financial | CRUD+, Spent tracking | Budget allocation |
| **transactionEntryService** | Financial | CRUD, Double-entry | Journal entries |
| **chartOfAccountService** | Financial | CRUD, Archive | GL accounts |
| **categoryService** | Financial | CRUD, Archive | Category organization |
| **statusService** | Financial | CRUD+, Reorder | Status definitions |
| **announcementService** | Communication | CRUD+, Publish | Org announcements |
| **newsletterService** | Communication | CRUD+, Send, Preview | Newsletter mgmt |
| **emailService** | Communication | Send, Batch, Retry | Email operations |
| **wallService** | Communication | CRUD, Like/Unlike | Social wall |
| **voteService** | Communication | Vote, Results | Poll system |
| **assetService** | Asset | CRUD+, Status | Asset tracking |
| **assetTypeService** | Asset | CRUD, Archive | Type definitions |
| **attachmentService** | Asset | Upload, Download, Delete | File management |
| **imageService** | Asset | Upload, Batch, Thumbnail | Image handling |
| **evidenceService** | Asset | Upload, Query by entity | Evidence collection |
| **searchService** | Utility | Search, Advanced, Saved | Global search |
| **historyService** | Utility | Query, Export, Log | Audit trail |
| **chartService** | Utility | CRUD+, Export, Data | Chart config |
| **analyticsService** | Utility | Track, Report, Dashboard | Analytics |
| **alertService** | Utility | CRUD, Read status, Bulk ops | Notification alerts |
| **tourService** | Utility | CRUD+, Publish, Steps | App tours |
| **tokenService** | Utility | CRUD, Validate, Refresh | Token mgmt |
| **pdfService** | Utility | Generate, Merge, Extract | PDF operations |
| **reminderService** | Utility | CRUD+, Snooze, Dismiss | Reminders |
| **timelineService** | Utility | Log, Query, Export | Activity timeline |
| **aiService** | Utility | Prompt, Generate, Translate | AI features |
| **demoService** | Utility | Generate, Clear data | Demo data |
| **informationService** | Utility | CRUD+, Publish, Reorder | Help content |
| **contentService** | Utility | CRUD+, Publish, Archive | Content mgmt |
| **firebaseService** | Integration | Config, Messaging, Storage | Firebase ops |
| **vendorCommentService** | Integration | CRUD, Rating | Vendor feedback |
| **vendorSubmitService** | Integration | Submit, Approve, Reject | Vendor workflow |
| **bookingTypeService** | Type | CRUD, Archive | Booking types |
| **eventTypeService** | Type | CRUD, Archive | Event types |
| **userContextService** | Context | Get, Update, Permissions | User context |
| **organisationContextService** | Context | Get, Update, Members | Org context |
| **settingsUIService** | Settings | Get, Update, Reset | UI preferences |
| **settingsContextService** | Settings | Get, Update by section | Org settings |
| **adminOrganisationService** | Admin | Suspend, Delete, Stats, Logs | System admin |
| **chatService** | Real-time | Subscribe, Send, React, Delete | Firebase chat |
| **notificationService** | Real-time | Get, Mark Read, Delete | Push notifications |

## Common Method Signatures

### Basic CRUD
```typescript
getAll(orgId: string): Promise<ApiResponse<T[]>>
getAllArchived(orgId: string): Promise<ApiResponse<T[]>>
get(id: string): Promise<ApiResponse<T>>
create(orgId: string, data: Partial<T>): Promise<ApiResponse<T>>
update(id: string, data: Partial<T>): Promise<ApiResponse<T>>
delete(id: string): Promise<ApiResponse<boolean>>
```

### Archive Operations
```typescript
archive(id: string): Promise<ApiResponse<T>>
unarchive(id: string): Promise<ApiResponse<T>>
getAllArchived(orgId: string): Promise<ApiResponse<T[]>>
```

### Status Management
```typescript
updateStatus(id: string, status: string): Promise<ApiResponse<T>>
```

### Relationship Queries
```typescript
getAllForVendor(vendorId: string): Promise<ApiResponse<T[]>>
getAllForWorkFlow(workflowId: string): Promise<ApiResponse<T[]>>
getForEntity(entityId: string, entityType: string): Promise<ApiResponse<T[]>>
```

### Flag Operations
```typescript
flag(id: string, reason?: string): Promise<ApiResponse<T>>
unflag(id: string): Promise<ApiResponse<T>>
```

### Batch Operations
```typescript
sendBatch(orgId: string, items: T[]): Promise<ApiResponse<T[]>>
```

### Export Operations
```typescript
export(orgId: string, format: 'csv' | 'json'): Promise<Blob>
```

## Usage Patterns

### Pattern 1: Simple Query
```typescript
import { taskService } from '@services';

const tasks = await taskService.getAll(orgId);
```

### Pattern 2: With Error Handling
```typescript
try {
  const invoice = await invoiceService.get(invoiceId);
  // use invoice
} catch (error) {
  console.error('Failed to fetch invoice:', error.message);
}
```

### Pattern 3: Conditional Query
```typescript
const tasks = archived 
  ? await taskService.getAllArchived(orgId)
  : await taskService.getAll(orgId);
```

### Pattern 4: Chained Operations
```typescript
// Create and then update
const task = await taskService.create(orgId, taskData);
await taskService.updateStatus(task.data.id, 'in_progress');
```

### Pattern 5: Batch Operations
```typescript
const results = await emailService.sendBatch(orgId, emailList);
```

### Pattern 6: Related Entity Query
```typescript
const vendorInvoices = await invoiceService.getAllForVendor(vendorId);
```

### Pattern 7: Status Workflow
```typescript
// Create → Submit → Approve
const invoice = await invoiceService.create(orgId, data);
await invoiceService.submit(invoice.data.id);
// Later: approve
await invoiceService.updateStatus(invoiceId, 'approved');
```

### Pattern 8: Archive Workflow
```typescript
// Check archived items
const archivedTasks = await taskService.getAllArchived(orgId);

// Archive an item
await taskService.archive(taskId);

// Restore it
await taskService.unarchive(taskId);
```

## Service Dependencies

Most services depend on:
- **apiClient**: Axios instance with interceptors (`src/utils/apiClient.ts`)
- **Auth Context**: For current user/org information

Financial services typically need:
- **financialYearService**: Reference for fiscal year
- **categoryService**: For expense categorization
- **statusService**: For status definitions

Operational services work with:
- **workflowService**: For process definitions
- **statusService**: For workflow status
- **userService**: For team members

## Error Responses

All services return errors in this format (handled by interceptor):
```typescript
{
  status: number,
  message: string,
  data?: any,
  errors?: Record<string, string[]>
}
```

## Rate Limiting & Best Practices

1. **Batch Operations**: Use batch endpoints for multiple items
2. **Search Caching**: Cache search results in Zustand
3. **Lazy Loading**: Use pagination for large lists
4. **Debounce Search**: Debounce search queries to reduce API calls
5. **Optimistic Updates**: Update UI before API response for UX

## Entity Relationships

```
User
├── Organisation (member of multiple)
├── Tasks (assigned to)
├── Groups (member of)
└── Conversations (participant in)

Invoice ──┬─→ Vendor
          ├─→ Workflow
          ├─→ Quote (may originate from)
          └─→ Workorder (may create)

Transaction
├── TransactionEntry (double-entry)
└── ChartOfAccount (GL account)

Document
├── Folder (organized in)
├── Attachment (contains)
└── comments (has many)

Event ────┬─→ EventType
          └─→ User (attendees)

Booking ──┬─→ BookingType
          ├─→ Resource
          └─→ User
```

## Next Steps

1. Review [SERVICES_INTEGRATION_GUIDE.md](./SERVICES_INTEGRATION_GUIDE.md) for detailed usage
2. Check API client configuration in `src/utils/apiClient.ts`
3. Explore Zustand stores in `src/stores/` for state management examples
4. Use TypeScript interfaces for type safety
