import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase web configuration is public client configuration, not a secret.
// Replace these values with the Firebase project's web app settings.
export const firebaseConfig = {
    apiKey: 'REPLACE_WITH_FIREBASE_API_KEY',
    authDomain: 'REPLACE_WITH_FIREBASE_AUTH_DOMAIN',
    projectId: 'REPLACE_WITH_FIREBASE_PROJECT_ID',
    storageBucket: 'REPLACE_WITH_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'REPLACE_WITH_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'REPLACE_WITH_FIREBASE_APP_ID',
}

// Only these verified Firebase accounts can open the publishing dashboard.
export const ADMIN_EMAILS = ['REPLACE_WITH_ADMIN_EMAIL']

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
    (value) => value && !value.startsWith('REPLACE_WITH_'),
) && ADMIN_EMAILS.length > 0 && ADMIN_EMAILS.every(
    (email) => email && !email.startsWith('REPLACE_WITH_'),
)

const app = isFirebaseConfigured
    ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
    : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null
