import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getRealtimeDatabase, Database } from 'firebase/database';
import { getMessaging, Messaging } from 'firebase/messaging';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

let app: FirebaseApp;
let firestore: Firestore;
let database: Database | null;
let messaging: Messaging | null;
let auth: Auth;

export function initializeFirebase() {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    auth = getAuth(app);
    
    try {
      messaging = getMessaging(app);
    } catch (error) {
      console.warn('Messaging not available:', error);
    }

    try {
      database = getRealtimeDatabase(app);
    } catch (error) {
      console.warn('Realtime database not available:', error);
    }

    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export function getFirebaseApp(): FirebaseApp {
  return app;
}

export function getFirestoreInstance(): Firestore {
  return firestore;
}

export function getDatabaseInstance(): Database | null {
  return database;
}

export function getMessagingInstance(): Messaging | null {
  return messaging;
}

export function getAuthInstance(): Auth {
  return auth;
}
