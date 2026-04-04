# Architecture Documentation

## Overview

This React Native mobile app follows a modular, scalable architecture with clear separation of concerns. The app uses Expo for development and deployment, with Firebase and Auth0 for backend services.

## Key Architectural Principles

1. **Modularity**: Each feature is self-contained within its own directory
2. **Type Safety**: Strict TypeScript throughout the codebase
3. **State Management**: Zustand for predictable state updates
4. **Service Layer**: Centralized API communication through services
5. **Component Composition**: Reusable, composable UI components
6. **DRY (Don't Repeat Yourself)**: Shared utilities and hooks

## Folder Structure

```
src/
├── components/        # Reusable UI components
├── screens/          # Screen/page level components
├── navigation/       # Navigation configuration
├── services/         # API layer services
├── hooks/            # Custom React hooks
├── store/            # Zustand store slices
├── utils/            # Utility functions
├── constants/        # App constants and theme
├── context/          # React contexts (Auth0)
├── firebase/         # Firebase services
└── types/            # TypeScript interfaces
```

## Components Layer

### Purpose
Provides reusable, composable UI building blocks.

### Key Components
- **Button**: Themeable button with variants
- **Card**: Container component with optional elevation
- **Input**: Text input with validation support
- **Header**: Screen header component
- **Avatar**: User avatar display
- **Loading**: Loading skeleton components
- **ErrorBoundary**: Error handling
- **EmptyState**: Empty state display
- **GlobalLoadingOverlay**: Global loading indicator

### Design Pattern
- Functional components with hooks
- Prop-based customization
- Consistent theming

## Screens Layer

### Purpose
Represents full-screen components that use other components and hooks.

### Key Screens
- **SplashScreen**: App initialization
- **LoginScreen**: Authentication
- **HomeScreen**: Organisation selection
- **DashboardScreen**: Main dashboard (role-based)
- **ProfileScreen**: User profile
- **ChatScreen**: Chat interface

### Design Pattern
- Fetch data via hooks
- Compose from components
- Handle navigation and state

## Navigation Layer

### Structure
```
RootNavigator
├── Auth
│   └── AuthNavigator (Login)
└── App
    └── AppNavigator (Drawer)
        ├── Home Stack
        ├── Dashboard Stack
        ├── Profile Stack
        └── Chat Stack
```

### Deep Linking
Configured for common routes:
- `mobileapp://dashboard/:id`
- `mobileapp://profile`
- `mobileapp://chat`

## Services Layer

### API Client
- **apiClient**: Axios instance with interceptors
  - Handles authentication tokens
  - Automatic token refresh
  - Error handling and logging

### Service Classes
Each service handles a domain:
- **userService**: User operations
- **organisationService**: Organisation management
- **dashboardService**: Dashboard data
- **chatApiService**: Chat API
- **notificationApiService**: Notification settings
- **authApiService**: Authentication

### Pattern
```typescript
class DomainService {
  async getItems(): Promise<ApiResponse<T[]>>
  async getItemById(id: string): Promise<ApiResponse<T>>
  async createItem(data: Partial<T>): Promise<ApiResponse<T>>
  async updateItem(id: string, data: Partial<T>): Promise<ApiResponse<T>>
  async deleteItem(id: string): Promise<ApiResponse<void>>
}
```

## State Management

### Zustand Stores
```
authStore
├── user: User | null
├── isAuthenticated: boolean
├── tokens: { accessToken, refreshToken }
└── methods: setUser(), logout(), etc.

organisationStore
├── selectedOrganisation: Organisation | null
├── organisations: Organisation[]
└── methods: setSelectedOrganisation(), etc.

uiStore
├── notifications: Notification[]
├── showLoading: boolean
└── methods: addNotification(), etc.
```

### Why Zustand?
- Lightweight and performant
- Simple API compared to Redux
- Built-in middleware support
- AsyncStorage persistence

## Hooks Layer

### Custom Hooks
- **useAuth**: Authentication state and methods
- **useFetch**: Data fetching with loading state
- **useMutation**: Data mutation with loading state

### Benefits
- Reusable logic across components
- Separation of concerns
- Easy testing

## Firebase Integration

### Services
- **ChatService**: Real-time messaging
- **NotificationService**: Push notifications
- **Firebase Auth**: Optional authentication

### Features
- Real-time listeners for chat
- FCM for push notifications
- Firestore for message storage

## Authentication Flow

### Auth0 Setup
1. User initiates login
2. Auth0Context handles authentication
3. Create user object from Auth Token
4. Store tokens in SecureStore
5. Update auth store
6. Redirect to app

### Token Management
- Access token stored for API calls
- Automatic refresh via interceptor
- Secure storage for sensitive data

## API Communication

### Request Flow
```
Component
  ↓
Hook (useFetch/useMutation)
  ↓
Service (e.g., userService)
  ↓
apiClient.get/post/put/delete
  ↓
Axios Interceptor (add auth token)
  ↓
API Server
```

### Error Handling
1. API errors caught and logged
2. Notification shown to user
3. State updated for UI
4. 401 errors trigger token refresh

## Type Safety

### TypeScript Usage
- Strict mode enabled
- Interfaces for all data types
- Type-safe navigation
- Generic utility functions

### Example
```typescript
interface User {
  id: string;
  email: string;
  role: UserRole;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

## Performance Considerations

### Optimization Strategies
1. **Component Memoization**: Prevent unnecessary re-renders
2. **Lazy Loading**: Screens loaded on-demand
3. **Image Optimization**: Proper image sizing
4. **Store Subscriptions**: Only listen to needed state
5. **API Caching**: Service-level caching (optional)

## Security

### Best Practices
1. **Token Storage**: Secure keychain/Keystore
2. **HTTPS Only**: All API communication encrypted
3. **Auth0 Verification**: Validated tokens
4. **Input Validation**: Sanitize user input
5. **Permissions**: Runtime permission requests
6. **Secrets Management**: Environment variables for sensitive data

## Scalability

### Adding New Features

1. **Create Service**
   ```typescript
   class NewFeatureService {
     async getData() { /* */ }
   }
   ```

2. **Create Screen**
   ```typescript
   export function NewFeatureScreen() {
     const { data, isLoading } = useFetch(...);
     return <View>{/*...*/}</View>;
   }
   ```

3. **Add Navigation**
   ```typescript
   <Stack.Screen name="NewFeature" component={NewFeatureScreen} />
   ```

4. **Update Store (if needed)**
   ```typescript
   export const useNewFeatureStore = create(...)
   ```

## Code Quality

### Tools
- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks (optional)

### Standards
- Follow naming conventions
- Use meaningful variable names
- Write self-documenting code
- Add comments for complex logic

## Testing Strategy (Future)

### Unit Tests
- Utility functions
- Service methods (mocked API)

### Component Tests
- Component rendering
- User interactions
- Props handling

### Integration Tests
- Navigation flow
- API integration
- State management

## Deployment

### Build Process
1. Generate signing keys
2. Configure environment variables
3. Build app bundle
4. Upload to app stores
5. Configure CI/CD pipeline

### Environment Management
- Development (.env)
- Staging (.env.staging)
- Production (.env.production)

## Monitoring & Analytics (Future)

### Integration Points
- Firebase Analytics
- Crash reporting
- Performance monitoring
- User analytics

## Documentation

### Generated
- TypeScript types
- JSDoc comments
- README files

### Manual
- Architecture (this file)
- Setup guide (SETUP.md)
- API documentation
- Component storybook (optional)

## References

- [React Native Best Practices](https://reactnative.dev/docs/intro-react)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
