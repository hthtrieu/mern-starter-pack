import 'dotenv/config';

interface FirebaseConfigType {
  firebaseKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  appId: string;
  senderId: string;
  meansureId: string;
}

export const firebaseConfig: FirebaseConfigType = {
  firebaseKey: process.env.FIREBASE_KEY || '',
  authDomain: process.env.AUTH_DOMAIN || '',
  projectId: process.env.PROJECT_ID || '',
  storageBucket: process.env.STORAGE_BUCKET || '',
  appId: process.env.APP_ID || '',
  senderId: process.env.MESSAGING_SENDER_ID || '',
  meansureId: process.env.MEASUREMENT_ID || '',
};
