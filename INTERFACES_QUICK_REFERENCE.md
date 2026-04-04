# Interfaces Quick Reference

## Where to Find Interfaces

| Category | File | Examples |
|----------|------|----------|
| User, Auth, Dashboard | `core.interfaces.ts` | `User`, `AuthState`, `Dashboard` |
| Task, Vendor, Invoice | `entity.interfaces.ts` | `Task`, `Invoice`, `Vendor`, `Quote` |
| Conversation, Workflow | `operational.interfaces.ts` | `Conversation`, `Workflow`, `Meeting` |
| Budget, FinancialYear | `financial.interfaces.ts` | `Budget`, `FinancialYear`, `ChartOfAccount` |
| Email, Newsletter | `communication.interfaces.ts` | `Email`, `Announcement`, `Newsletter` |
| Asset, Image | `asset.interfaces.ts` | `Asset`, `Attachment`, `Image` |
| Search, Analytics | `utility.interfaces.ts` | `SearchResult`, `AnalyticsEvent`, `Alert` |
| Settings, Context | `context.interfaces.ts` | `UserContext`, `OrganisationContext`, `UISettings` |
| API Response | `api.interfaces.ts` | `ApiResponse<T>`, `PaginatedResponse<T>` |

## Common Imports

```typescript
// Core
import { User, Organisation, AuthState } from '@interfaces';

// Entities
import { Task, Invoice, Vendor, Quote } from '@interfaces';

// Operations
import { Conversation, Workflow, Meeting } from '@interfaces';

// Finance
import { Budget, FinancialYear, Category } from '@interfaces';

// Communication
import { Email, Announcement, Newsletter } from '@interfaces';

// Assets
import { Asset, Attachment, Image } from '@interfaces';

// Utilities
import { SearchResult, ChartConfig, AnalyticsEvent } from '@interfaces';

// Context
import { UserContext, OrganisationContext, UISettings } from '@interfaces';

// API
import { ApiResponse, PaginatedResponse, NotificationType } from '@interfaces';

// All at once
import type * as Types from '@interfaces';
```

## Usage Examples

### Basic Type Usage
```typescript
import { Task, User } from '@interfaces';

const myTask: Task = {
  id: '1',
  title: 'Complete project',
  description: 'Finish React Native refactoring',
  status: 'in-progress',
  // ... other fields
};
```

### With Services
```typescript
import { Task } from '@interfaces';
import { taskService } from '@services';

// taskService has methods that return/accept Task
const tasks: Task[] = await taskService.getAll(orgId);

await taskService.create({
  title: 'New Task',
  orgId: organizationId
} as Task);
```

### Component Props
```typescript
import { User, Organisation } from '@interfaces';

interface ProfileProps {
  user: User;
  organisation: Organisation;
}

export const Profile = ({ user, organisation }: ProfileProps) => {
  return <div>Welcome, {user.name}</div>;
};
```

### API Response
```typescript
import { ApiResponse, Task } from '@interfaces';

interface FetchTaskResult {
  data: ApiResponse<Task>;
  error?: ErrorResponse;
}

async function fetchTask(id: string): Promise<FetchTaskResult> {
  try {
    const response = await fetch(`/api/tasks/${id}`);
    return { data: response.json() };
  } catch (error) {
    return { data: null, error: { message: 'Failed to fetch' } };
  }
}
```

### Extending Types
```typescript
import { User } from '@interfaces';

// Add custom properties
interface CurrentUser extends User {
  isAuthenticated: boolean;
  permissions: string[];
}

// Or create a new type
type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

## Quick Navigation

### Need a Type for...?

**User Management** → `core.interfaces.ts`
```typescript
User, Organisation, UserRole, AuthState
```

**Tasks & Projects** → `entity.interfaces.ts`
```typescript
Task, Workorder, Document
```

**Meetings & Schedules** → `operational.interfaces.ts`
```typescript
Meeting, Event, Booking, Conversation
```

**Financial Data** → `financial.interfaces.ts`
```typescript
Invoice, Budget, Transaction, FinancialYear
```

**Communications** → `communication.interfaces.ts`
```typescript
Email, Announcement, Newsletter, Vote
```

**Files & Media** → `asset.interfaces.ts`
```typescript
Asset, Image, Attachment, Evidence
```

**Analytics & Utilities** → `utility.interfaces.ts`
```typescript
AnalyticsEvent, SearchResult, Alert, ChartConfig
```

**Configuration** → `context.interfaces.ts`
```typescript
UserContext, OrganisationContext, UISettings, AdminOrganisation
```

**API Communication** → `api.interfaces.ts`
```typescript
ApiResponse<T>, PaginatedResponse<T>, NotificationType
```

## Type Safety Checklist

- ✅ Always import types from `@interfaces`
- ✅ Use `type` keyword for type-only imports
- ✅ Extend interfaces instead of creating duplicates
- ✅ Define required vs optional fields clearly
- ✅ Use enums for status/role fields
- ✅ Add JSDoc comments for complex types
- ✅ Keep types in interfaces folder, not scattered

## Backward Compatibility

Old code still works:
```typescript
// These still work (routes to @interfaces)
import { User } from '@types';
import { Task } from '@services';
```

But prefer:
```typescript
// New code should use this
import { User, Task } from '@interfaces';
```

## Bulk Operations

```typescript
// Import entire category
import { type Task, type Invoice, type Quote } from '@interfaces';

// Re-export category
export type { Task, Invoice, Quote } from '@interfaces';

// Type all at once
import type * as Types from '@interfaces';

// Use as
const task: Types.Task = { ... };
```

## Finding Code

```bash
# Find all uses of interface
grep -r "Task" src/

# Find interface definition
grep -n "export interface Task" src/interfaces/

# Find all imports
grep -r "from '@interfaces'" src/
```

## Common Patterns

### Factory Function
```typescript
import { Task } from '@interfaces';

function createTask(partial: Partial<Task>): Task {
  return {
    id: generateId(),
    title: '',
    description: '',
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...partial
  };
}
```

### Type Guard
```typescript
import { Task, type User } from '@interfaces';

function isTask(obj: unknown): obj is Task {
  return typeof obj === 'object' && 
         obj !== null && 
         'title' in obj && 
         'status' in obj;
}
```

### Partial Update
```typescript
import { type Invoice } from '@interfaces';

type InvoiceUpdate = Partial<Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>>;

function updateInvoice(id: string, changes: InvoiceUpdate) {
  // ...
}
```

### API Response Wrapper
```typescript
import { Task, ApiResponse } from '@interfaces';

const response: ApiResponse<Task[]> = {
  success: true,
  data: [...tasks],
  timestamp: new Date().toISOString()
};
```

## Performance Tips

- ✅ Use `type` imports for types (not values)
- ✅ Import only what you need (not `*`)
- ✅ Avoid circular imports
- ✅ Keep interfaces lean (no logic)
- ✅ Use discriminated unions for type narrowing

## Documentation

Each interface in `src/interfaces/*.ts` has JSDoc comments explaining:
- Purpose
- Required fields
- Optional fields
- Common usage patterns
- Related interfaces

Example:
```typescript
/**
 * Represents a task in the system.
 * 
 * @example
 * const task: Task = {
 *   id: '123',
 *   title: 'Complete project',
 *   status: 'in-progress'
 * };
 */
export interface Task {
  // ...
}
```

## Troubleshooting

**"Cannot find module '@interfaces'"**
- Check tsconfig paths configuration
- Ensure `src/interfaces/index.ts` exists
- Clear node_modules and reinstall

**Type not found**
- Check which interface file it should be in
- Ensure it's exported from that file
- Verify it's exported from `interfaces/index.ts`

**Circular dependency**
- Keep interfaces pure (no logic)
- Don't import services in interfaces
- Keep interfaces independent

## Related Files

- 📄 Architecture Guide: `INTERFACES_ARCHITECTURE_GUIDE.md`
- 📂 Interfaces Folder: `src/interfaces/`
- 📂 Services: `src/services/` (all import from @interfaces)
- 📄 Requirements: `requirements.md`
- 📂 Types: `src/types/index.ts` (re-exports from @interfaces)
