# 📱 React Native Mobile App – Full AI Build Prompt

## 🎯 Objective
Build a **production-ready React Native mobile application** (Android + iOS only, no web) using **Expo**, based on an existing Angular web app (code will be provided for reference).

The mobile app should replicate core functionality, UX patterns, and API integrations from the Angular app while following modern mobile best practices.

---

## 🧱 Tech Stack (MANDATORY)
- React Native (Expo)
- TypeScript (strict mode)
- UI Library: GlueStack
- Navigation: React Navigation (Drawer + Stack)
- Authentication: Auth0
- Push Notifications: Firebase Cloud Messaging (FCM)
- Chat: Firebase (Firestore / Realtime DB)
- State Management: Zustand (preferred) OR Redux Toolkit
- API Layer: Axios (with interceptors)

---

## 📁 Folder Structure (STRICT)

Follow a scalable modular architecture:


src/
├── components/ # Reusable UI components
├── screens/ # Screen-level components
├── navigation/ # Navigation setup (stacks, drawers)
├── services/ # API services (based on Angular services)
├── hooks/ # Custom hooks
├── store/ # Zustand/Redux store
├── utils/ # Helper functions
├── constants/ # Colors, config, enums
├── context/ # Auth / global contexts
├── firebase/ # Firebase setup
└── types/ # TypeScript types/interfaces


---

## 🔐 Authentication Flow (Auth0)

- Implement Auth0 login
- Persist user session securely
- Handle token refresh
- Attach access token to API requests via Axios interceptor
- Logout flow should clear all state

---

## 🔗 Deep Linking

Configure deep linking for:
- Organisation selection
- Dashboard navigation
- Profile screen

---

## 🔔 Push Notifications (Firebase)

- Integrate Firebase Cloud Messaging
- Handle:
  - Foreground notifications
  - Background notifications
  - Notification click navigation

---

## 💬 Chat (Firebase)

- Real-time chat implementation
- Per-organisation chat support
- Message list + input UI
- Typing indicators (optional but preferred)

---

## 📱 Screens & Navigation

### 1. Splash Screen
- App loading state
- Token validation
- Redirect to Login or Home

---

### 2. Login Screen
- Auth0 login integration
- Clean UI (modern mobile UX)

---

### 3. Home Screen
- List of Organisations (Card-based UI)
- Navigation Drawer
- Each card navigates to Dashboard

---

### 4. Dashboards

#### Admin Dashboard
- Dedicated Drawer Navigation

#### User Dashboard
- Dedicated Drawer Navigation

---

### 5. User Profile Screen
- Accessible from ALL drawers
- Shows:
  - Name
  - Role (Admin/User/Viewer)
  - Organisation context

---

## 🧠 Role-Based Access Control (IMPORTANT)

Implement a reusable helper:

```ts
canAccess(role: UserRole, allowedRoles: UserRole[]): boolean

Use this across UI to:

Show/hide components

Restrict navigation

Control feature visibility

Roles:

ADMIN

USER

VIEWER

🎨 UI / UX Requirements
Color Scheme

Primary: #673ab7

Secondary: #009688

Design Principles

Clean, modern mobile-first UI

Consistent spacing & typography

Smooth navigation transitions

♻️ Reusable Components (MANDATORY)
1. Loading System

LoadingCard (skeleton)

LoadingList

LoadingPage

2. Toast System

Global toaster supporting:

success

error

warning

info

3. Common Components

Card

Button

Input

Avatar

Header

🔌 API Integration

Use Angular services as reference

Convert them into modular service files

Centralized Axios instance:

Base URL

Interceptors (auth, error handling)

🧩 State Management

Store:

Auth state

Selected organisation

User profile (per organisation)

⚙️ Performance Considerations

Lazy load screens

Memoize components where needed

Avoid unnecessary re-renders

🧪 Code Quality

Use TypeScript everywhere

Follow ESLint + Prettier

Write clean, modular, reusable code

Avoid duplication

📦 Deliverables

Fully working Expo project

Clean folder structure

Reusable components

Scalable architecture

Well-structured navigation

Firebase + Auth0 fully integrated

📎 Inputs I Will Provide

Angular Routes (for navigation reference)

Angular Services (for API reference, just convert them to react code and keep it)

UI references from Angular app

🚀 Bonus

Dark mode support