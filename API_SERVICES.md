# API Services Documentation

## Overview

This document provides a guide on how to use the API services in the application. All services follow a consistent pattern and return standardized API responses.

## API Response Format

All API calls return a standardized response:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}
```

## Usage Example

```typescript
const response = await userService.getProfile();

if (response.success) {
  console.log('User:', response.data);
} else {
  console.log('Error:', response.error);
}
```

## Services

### User Service

Handles user-related operations.

#### Methods

```typescript
// Get current user profile
getProfile(): Promise<ApiResponse<User>>

// Update user profile
updateProfile(data: Partial<User>): Promise<ApiResponse<User>>

// Get all users (paginated)
getUsers(page: number, limit: number): Promise<ApiResponse<PaginatedResponse<User>>>

// Get specific user
getUserById(id: string): Promise<ApiResponse<User>>

// Create new user (admin only)
createUser(data: Partial<User>): Promise<ApiResponse<User>>

// Update specific user
updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>>

// Delete user
deleteUser(id: string): Promise<ApiResponse<void>>
```

#### Example Usage

```typescript
import { userService } from '@services/index';
import { useFetch } from '@hooks/index';

export function UserList() {
  const { data: users, isLoading } = useFetch(
    () => userService.getUsers(1, 20)
  );

  if (isLoading) return <LoadingList />;
  
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
}
```

### Organisation Service

Manages organisation-related operations.

#### Methods

```typescript
// Get all organisations
getOrganisations(): Promise<ApiResponse<Organisation[]>>

// Get specific organisation
getOrganisationById(id: string): Promise<ApiResponse<Organisation>>

// Create new organisation
createOrganisation(data: Partial<Organisation>): Promise<ApiResponse<Organisation>>

// Update organisation
updateOrganisation(id: string, data: Partial<Organisation>): Promise<ApiResponse<Organisation>>

// Delete organisation
deleteOrganisation(id: string): Promise<ApiResponse<void>>

// Get organisation members
getOrganisationMembers(id: string): Promise<ApiResponse<PaginatedResponse<any>>>
```

### Dashboard Service

Provides dashboard data.

#### Methods

```typescript
// Get organisation dashboards
getDashboards(organisationId: string): Promise<ApiResponse<Dashboard[]>>

// Get specific dashboard
getDashboardById(id: string): Promise<ApiResponse<Dashboard>>

// Create dashboard
createDashboard(data: Partial<Dashboard>): Promise<ApiResponse<Dashboard>>

// Update dashboard
updateDashboard(id: string, data: Partial<Dashboard>): Promise<ApiResponse<Dashboard>>

// Delete dashboard
deleteDashboard(id: string): Promise<ApiResponse<void>>
```

#### Example Usage

```typescript
import { dashboardService } from '@services/index';

export function DashboardScreen() {
  const { selectedOrganisation } = useOrganisationStore();
  
  const { data: dashboards } = useFetch(() => 
    dashboardService.getDashboards(selectedOrganisation.id)
  );

  return (
    <View>
      {dashboards?.map(dash => (
        <DashboardWidget key={dash.id} dashboard={dash} />
      ))}
    </View>
  );
}
```

### Chat Service (API)

Chat message operations via REST API.

#### Methods

```typescript
// Get chat messages
getMessages(organisationId: string, limit?: number): Promise<ApiResponse<ChatMessage[]>>

// Create message
createMessage(organisationId: string, content: string): Promise<ApiResponse<ChatMessage>>

// Delete message
deleteMessage(messageId: string): Promise<ApiResponse<void>>

// Update message
updateMessage(messageId: string, content: string): Promise<ApiResponse<ChatMessage>>

// Search messages
searchMessages(organisationId: string, query: string): Promise<ApiResponse<ChatMessage[]>>
```

### Notification Service (API)

Notification settings management.

#### Methods

```typescript
// Get notification settings
getNotificationSettings(): Promise<ApiResponse<NotificationSettings>>

// Update notification settings
updateNotificationSettings(settings: NotificationSettings): Promise<ApiResponse<NotificationSettings>>

// Get all notifications
getNotifications(page?: number): Promise<ApiResponse<any[]>>

// Mark notification as read
markAsRead(notificationId: string): Promise<ApiResponse<void>>

// Delete notification
deleteNotification(notificationId: string): Promise<ApiResponse<void>>
```

### Auth Service (API)

Authentication operations.

#### Methods

```typescript
// Login
login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>>

// Register
register(data: any): Promise<ApiResponse<AuthResponse>>

// Logout
logout(): Promise<ApiResponse<void>>

// Refresh token
refreshToken(refreshToken: string): Promise<ApiResponse<{ access_token: string }>>

// Forgot password
forgotPassword(email: string): Promise<ApiResponse<{ message: string }>>

// Reset password
resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>>

// Verify email
verifyEmail(token: string): Promise<ApiResponse<void>>
```

## Firebase Services

### Chat Service (Real-time)

Real-time chat using Firestore.

```typescript
import { chatService } from '@firebase/index';

// Subscribe to organisation messages
const unsubscribe = chatService.subscribeToMessages(
  organisationId,
  (messages) => {
    console.log('Messages:', messages);
  }
);

// Send message
await chatService.sendMessage(organisationId, message);

// Cleanup
unsubscribe();
```

### Notification Service

Firebase Cloud Messaging for push notifications.

```typescript
import { notificationService } from '@firebase/index';

// Get FCM token
const token = await notificationService.getFCMToken();

// Listen to messages
const unsubscribe = notificationService.listenToMessages((payload) => {
  console.log('Notification received:', payload);
});
```

## Error Handling

### Try-Catch Pattern

```typescript
import { useMutation } from '@hooks/index';
import { showNotification } from '@store/index';

const { mutate, isLoading, error } = useMutation(
  (data) => userService.updateProfile(data),
  {
    onSuccess: () => {
      showNotification.success('Profile updated');
    },
    onError: (error) => {
      showNotification.error(error);
    }
  }
);
```

### API Error Codes

- **400**: Bad Request - Invalid input
- **401**: Unauthorized - Auth required or invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **500**: Internal Server Error

## Pagination

Services that return lists support pagination:

```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

// Usage
const response = await userService.getUsers(2, 20); // page 2, 20 items
```

## Rate Limiting

API requests are rate limited. If you exceed the limit:
- HTTP 429 response
- `Retry-After` header indicates when to retry
- Client automatically retries (Axios interceptor)

## Internationalization (i18n)

Error messages are returned in English. For
 other languages, translate client-side:

```typescript
const translations = {
  'error.not_found': 'Ressource non trouvée',
  'error.unauthorized': 'Non autorisé',
};

function getErrorMessage(error: string, lang: string) {
  const key = `error.${error}`;
  return translations[key] || error;
}
```

## Batch Requests (Future)

For efficiency, consider batching multiple requests:

```typescript
const users = await Promise.all([
  userService.getProfile(),
  userService.getUsers(1, 10),
  userService.getUserById('123')
]);
```

## Caching Strategy (Future)

Consider implementing caching:

```typescript
class CachedUserService {
  private cache = new Map();
  
  async getUser(id: string) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const user = await userService.getUserById(id);
    this.cache.set(id, user);
    return user;
  }
}
```

## Best Practices

1. **Always check response.success**: Don't assume success
2. **Handle loading states**: Show indicators while fetching
3. **Catch errors gracefully**: Show user-friendly messages
4. **Use hooks for data fetching**: Don't call services directly in components
5. **Batch related requests**: Use Promise.all when appropriate
6. **Implement retry logic**: Automatically retry failed requests
7. **Cache when appropriate**: Reduce unnecessary API calls
8. **Unsubscribe from listeners**: Prevent memory leaks

## Common Patterns

### Fetching Data

```typescript
import { useFetch } from '@hooks/index';

const { data, isLoading, error, refetch } = useFetch(
  () => service.getData(),
  { refetchInterval: 5000 } // Auto-refresh every 5 seconds
);
```

### Mutation (Create/Update/Delete)

```typescript
import { useMutation } from '@hooks/index';

const { mutate, isLoading } = useMutation(
  (data) => service.updateData(data),
  {
    onSuccess: () => refetch(),
    onError: (error) => console.error(error)
  }
);

// Usage
const handleSubmit = () => {
  mutate(formData);
};
```

### Dependent Requests

```typescript
const { data: org } = useFetch(() => 
  organisationService.getOrganisationById(orgId)
);

const { data: members } = useFetch(
  () => organisationService.getOrganisationMembers(org.id),
  { skip: !org } // Wait for org to load
);
```

## Troubleshooting

### "Access token not found"
- User not authenticated
- Token expired and refresh failed
- Check SecureStore configuration

### "API request timeout"
- Network connectivity issue
- Server is slow
- Increase timeout in apiClient.ts

### "CORS error"
- Only occurs in web environment
- Mobile app doesn't have CORS restrictions
- Verify API server CORS settings

## Support

For questions or issues with API services:
1. Check the error messages in console
2. Verify API endpoint configuration
3. Check Firebase configuration
4. Review Auth0 token validity
