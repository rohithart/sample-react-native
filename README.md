# React Native Mobile App

A production-ready React Native application built with Expo, TypeScript, and Firebase.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sample-react-native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual configuration
   ```

4. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Download `google-services.json` for Android
   - Copy to project root

5. **Configure Auth0**
   - Create an Auth0 application at https://manage.auth0.com
   - Update `.env` with your Auth0 credentials

## 📱 Running the App

### Development Mode
```bash
# Start Expo CLI
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Building for Production
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation setup
├── services/           # API services
├── hooks/              # Custom React hooks
├── store/              # Zustand store
├── utils/              # Utility functions
├── constants/          # App constants
├── context/            # React contexts
├── firebase/           # Firebase setup
└── types/              # TypeScript types
```

## 🔐 Authentication

The app uses Auth0 for authentication:
- Configure your Auth0 domain and client ID in `.env`
- Auth0 context provider handles login/logout flow
- Access tokens are stored securely using Expo Secure Store

## 🔔 Push Notifications

Firebase Cloud Messaging (FCM) integration:
- Automatically requests notification permissions
- Handles foreground and background notifications
- Deep linking for notification tap actions

## 💬 Real-time Chat

Firebase Firestore with real-time listeners:
- Real-time message synchronization
- Per-organisation chat support
- Message history retrieval

## 🎨 UI Library

Using GlueStack UI for consistent, accessible components throughout the app.

## 🎯 Role-Based Access Control

Three roles implemented:
- **ADMIN**: Full platform access
- **USER**: Standard user features
- **VIEWER**: Read-only access

Helper function `canAccess()` checks permissions before rendering components.

## 🧪 Code Quality

- TypeScript strict mode enabled
- ESLint for code linting
- Prettier for code formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 🌍 Environment Variables

Required environment variables:

```
# Auth0
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_AUDIENCE=your-api-identifier

# API
API_BASE_URL=https://api.example.com

# Firebase
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
FIREBASE_DATABASE_URL=...
```

## 📦 Key Dependencies

- **react-native**: Native development framework
- **expo**: Development and build tools
- **react-navigation**: Navigation library
- **zustand**: State management
- **firebase**: Backend services
- **axios**: HTTP client
- **gluestack-ui**: UI component library
- **typescript**: Type safety

## 🔗 Deep Linking

Configured deep linking for:
- Dashboard: `mobileapp://dashboard/:id`
- Profile: `mobileapp://profile`
- Chat: `mobileapp://chat`

## 📝 API Integration

Axios client with:
- Request/response interceptors
- Automatic token refresh
- Error handling
- Retry logic

## 🚦 State Management

Zustand stores for:
- Authentication state
- Organisation selection
- UI state (notifications, loading)

## 🛠️ Troubleshooting

### Build Issues
- Clear cache: `npm run clean` (add this to package.json)
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Firebase Issues
- Ensure `google-services.json` is in project root
- Verify Firebase configuration matches project

### Auth0 Issues
- Verify Auth0 credentials in `.env`
- Check allowed callback URLs in Auth0 dashboard

## 📚 Documentation

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions, please create an issue in the repository.
