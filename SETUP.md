/**
 * Setup Guide for React Native Mobile App
 * 
 * This guide provides step-by-step instructions for setting up the development environment
 * and configuring all necessary services.
 */

# Development Environment Setup

## 1. Prerequisites
- Node.js (v16+)
- npm or yarn
- Xcode (for iOS)
- Android Studio (for Android)
- Expo CLI

## 2. Initial Setup

### Install Dependencies
```bash
npm install
# or
yarn install
```

## 3. Environment Configuration

### Create .env file
```bash
cp .env.example .env
```

### Update with your credentials
```env
# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_AUDIENCE=your-api-identifier

# Firebase
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-bucket
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_DATABASE_URL=your-db-url

# API
API_BASE_URL=https://api.yourdomain.com
```

## 4. Firebase Setup

### Create Firebase Project
1. Go to Firebase Console: https://console.firebase.google.com
2. Create a new project
3. Enable Authentication (Email/Password, Google)
4. Create Firestore Database
5. Enable Cloud Messaging

### Download Configuration Files

#### For Android
1. In Firebase Console, add an Android app
2. Download `google-services.json`
3. Place in project root

#### For iOS
1. In Firebase Console, add an iOS app
2. Download `GoogleService-Info.plist`
3. Open `ios/` folder in Xcode and add the file

## 5. Auth0 Setup

### Create Auth0 Tenant
1. Go to https://manage.auth0.com
2. Create a new tenant
3. Create a new SPA application
4. Configure Allowed Callback URLs:
   ```
   mobileapp://expo-auth-callback
   exp://localhost:19000
   exp://your-device-ip:19000
   ```

### Update .env with credentials

## 6. Running the App

### Start Expo
```bash
npm start
```

### In another terminal - iOS
```bash
npm run ios
```

### In another terminal - Android
```bash
npm run android
```

## 7. Debugging

### Expo DevTools
- Press `i` for iOS
- Press `a` for Android
- Press `d` to open browser DevTools

### Console Logs
- Use `console.log()` - visible in Expo CLI
- Use React Native Debugger for advanced debugging

## 8. Common Issues

### Metro Bundler Issues
```bash
npm start -- --clear
```

### Module Resolution Issues
- Clear cache: `rm -rf node_modules && npm install`
- Clear Expo cache: `exp start --clear`

### Firebase Connection Issues
- Verify API keys in .env
- Check Firebase project settings
- Ensure Firestore security rules allow reads/writes

## 9. Project Structure Tips

- **screens/**: Place screen containers here
- **components/**: Reusable UI components
- **services/**: API service classes
- **hooks/**: Custom React hooks
- **store/**: Zustand store slices
- **utils/**: Helper functions
- **constants/**: App constants and theme

## 10. Before Deployment

- [ ] Update app version in app.json
- [ ] Generate app signing keys
- [ ] Configure App Store Connect (iOS)
- [ ] Configure Google Play Console (Android)
- [ ] Enable App Signing by Expo
- [ ] Run full test suite
- [ ] Review security settings

## Useful Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Clean build
rm -rf node_modules .expo && npm install
```

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Auth0 Docs](https://auth0.com/docs)
- [React Navigation](https://reactnavigation.org/)

## Support

For questions or issues, check:
1. Console logs in Expo
2. Network tab in DevTools
3. Firebase Console for errors
4. Auth0 Dashboard for auth issues
