import {
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  GOOGLE_API_KEY,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from 'env';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: GOOGLE_API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  },
};
