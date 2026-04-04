# Quick Reference Guide

## Essential Commands

```bash
# Install dependencies
npm install

# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type check
npm run type-check

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format

# Clean all
rm -rf node_modules .expo && npm install
```

## Import Aliases

Use these shortcuts in imports:

```typescript
import Component from '@components/Button';
import { LoginScreen } from '@screens/index';
import { userService } from '@services/index';
import { useAuth } from '@hooks/index';
import { useAuthStore } from '@store/index';
import { canAccess } from '@utils/index';
import { Colors } from '@constants/index';
import { Auth0Provider } from '@context/index';
import { chatService } from '@firebase/index';
import { User, UserRole } from '@types/index';
```

## Common Patterns

### Fetch Data in a Screen

```typescript
import { useFetch } from '@hooks/index';
import { userService } from '@services/index';

export function UserScreen() {
  const { data: users, isLoading, error } = useFetch(
    () => userService.getUsers(1, 20)
  );

  if (isLoading) return <LoadingList />;
  if (error) return <EmptyState title="Error" description={error} />;
  
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
}
```

### Mutate Data (Create/Update)

```typescript
import { useMutation } from '@hooks/index';
import { showNotification } from '@store/index';

export function EditUserForm() {
  const [formData, setFormData] = useState({});
  const { mutate, isLoading } = useMutation(
    (data) => userService.updateProfile(data),
    {
      onSuccess: () => showNotification.success('Updated!'),
      onError: (error) => showNotification.error(error)
    }
  );

  return (
    <Button 
      title="Save" 
      onPress={() => mutate(formData)} 
      loading={isLoading} 
    />
  );
}
```

### Role-Based Rendering

```typescript
import { useAuthStore } from '@store/index';
import { UserRole } from '@types/index';
import { canAccess } from '@utils/index';

export function AdminFeature() {
  const { user } = useAuthStore();
  
  if (!canAccess(user?.role, [UserRole.ADMIN])) {
    return null; // Don't render for non-admins
  }

  return <AdminPanel />;
}
```

### Global Notifications

```typescript
import { showNotification } from '@store/index';

// Success notification
showNotification.success('Operation completed!');

// Error notification
showNotification.error('Something went wrong');

// Warning notification
showNotification.warning('Are you sure?');

// Info notification
showNotification.info('FYI: This is important');
```

### Authentication

```typescript
import { useAuth0 } from '@context/index';

export function LoginButton() {
  const { login, isSigningin } = useAuth0();
  
  return (
    <Button 
      title="Sign In" 
      onPress={login} 
      loading={isSigningin}
    />
  );
}
```

### Access User Data

```typescript
import { useAuthStore } from '@store/index';

export function ProfileView() {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) return <LoginScreen />;
  
  return (
    <View>
      <Avatar name={user.name} url={user.avatar} />
      <Text>{user.email}</Text>
    </View>
  );
}
```

### Create Reusable Component

```typescript
// src/components/UserCard.tsx
import { Card, Avatar, Button } from '@components/index';
import { User } from '@types/index';

interface UserCardProps {
  user: User;
  onPress?: () => void;
}

export function UserCard({ user, onPress }: UserCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card elevated>
        <Avatar name={user.name} url={user.avatar} size="medium" />
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </Card>
    </TouchableOpacity>
  );
}
```

### Real-time Chat

```typescript
import { chatService } from '@firebase/index';
import { useOrganisationStore } from '@store/index';

export function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const { selectedOrganisation } = useOrganisationStore();

  useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages(
      selectedOrganisation.id,
      setMessages
    );
    
    return unsubscribe;
  }, [selectedOrganisation]);

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <ChatBubble message={item} />}
    />
  );
}
```

### Navigation

```typescript
// Programmatic navigation
const navigation = useNavigation();

navigation.navigate('Dashboard'); // Stack
navigation.goBack();

// With parameters
navigation.navigate('OrganisationDetails', { id: '123' });

// Getting parameters
const { id } = useRoute().params;
```

## File Naming Conventions

- **Components**: `PascalCase.tsx` - `UserCard.tsx`
- **Screens**: `PascalCase.tsx` - `LoginScreen.tsx`
- **Services**: `camelCase.service.ts` - `user.service.ts`
- **Hooks**: `camelCase.ts` - `useAuth.ts`
- **Utils**: `camelCase.ts` - `permissions.ts`
- **Types**: `index.ts` - all types in one file
- **Constants**: `camelCase.ts` - `theme.ts`

## Folder Organization Rule

- Keep related files together
- One component per file
- Export from index.ts files
- Use meaningful directory names

## TypeScript Tips

### Define Props Interface

```typescript
interface ScreenProps {
  navigation: StackNavigationProp<ParamList>;
}

export function MyScreen({ navigation }: ScreenProps) {
  // ...
}
```

### Extract Computed Props

```typescript
// ❌ Avoid
{isAdmin && role === UserRole.ADMIN && canAccess ? <Admin /> : null}

// ✅ Better
const isAdminUser = isAdmin && role === UserRole.ADMIN && canAccess;
{isAdminUser && <Admin />}
```

### Use Type Guards

```typescript
// ❌
if (user) {
  console.log(user.name);
}

// ✅
function isUser(user: User | null): user is User {
  return user !== null;
}

if (isUser(user)) {
  console.log(user.name); // user is typed as User
}
```

## Performance Tips

### Memoize Components

```typescript
import { memo } from 'react';

const UserCard = memo(function UserCard({ user }) {
  return <Card>{user.name}</Card>;
});

export default UserCard;
```

### Use useCallback

```typescript
const handlePress = useCallback(() => {
  navigation.navigate('Details');
}, [navigation]);

return <Button onPress={handlePress} />;
```

### Lazy Load Images

```typescript
<Image
  source={{ uri: url }}
  style={{ width: 50, height: 50 }}
  defaultSource={require('./placeholder.png')}
/>
```

## Debugging

### Log Statements

```typescript
console.log('Value:', value); // Regular log
console.warn('Warning:', warning); // Warning
console.error('Error:', error); // Error
```

### React DevTools

- Press `i` for iOS in Expo CLI
- Press `a` for Android in Expo CLI
- Press `d` in Expo CLI to open debugger

### Network Debugging

```typescript
// Log all API calls
// In apiClient.ts interceptor
console.log('Request:', config);
console.log('Response:', response);
```

## Common Issues & Solutions

### "Cannot find module"
- Check import path
- Verify file exists
- Clear cache: `npm start -- --clear`

### "Network request failed"
- Check API_BASE_URL in .env
- Verify network connectivity
- Check CORS settings

### "Token refresh failed"
- User session expired
- Re-login required
- Check refresh_token in storage

### "Firebase not initialized"
- Verify Firebase config in .env
- Check google-services.json exists
- Ensure Firebase project is created

### "Auth0 callback not working"
- Verify Allowed Callback URLs in Auth0 dashboard
- Check redirectUrl in Auth0Context.tsx
- Ensure deep linking is configured

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Reference](https://firebase.google.com/docs)
- [Auth0 Integration](https://auth0.com/docs)
- [React Navigation Guide](https://reactnavigation.org/docs)
- [Zustand API](https://github.com/pmndrs/zustand)

## Project Statistics

- **Components**: 10+
- **Screens**: 6
- **Services**: 6
- **Hooks**: 3
- **Store Slices**: 3
- **Type Definitions**: 15+
- **Lines of Code**: 5000+

## Dependencies

### Core
- react-native@0.73.6
- expo@50.0.0
- typescript@5.2.2

### Navigation
- @react-navigation/native@6.1.9
- @react-navigation/drawer@6.6.6
- @react-navigation/stack@6.3.20

### UI & Styling
- @gluestack-ui/themed@2.0.0
- react-native-reanimated@3.6.0
- react-native-screens@3.29.0

### State Management
- zustand@4.4.2

### Firebase
- firebase@10.7.0
- @react-native-firebase/app@18.3.3
- @react-native-firebase/messaging@18.3.3

### API & Auth
- axios@1.6.2
- @auth0/react-native-auth0@3.0.0

### Storage
- @react-native-async-storage/async-storage@1.21.0
- expo-secure-store

## Next Steps

1. Configure .env with your credentials
2. Run `npm install` to install dependencies
3. Run `npm start` to start dev server
4. Run on iOS or Android
5. Build components for your specific features
6. Test authentication flow
7. Deploy to app stores

Enjoy building! 🚀
