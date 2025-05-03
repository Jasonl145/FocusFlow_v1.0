// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore'
import credentials from "./credentials.json";


const firebaseConfig = {
  //add your configs/api key here
  apiKey: credentials.REACT_APP_API_KEY,
  authDomain: credentials.REACT_APP_AUTH_DOMAIN,
  projectId: credentials.REACT_APP_PROJECT_ID,
  storageBucket: credentials.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: credentials.REACT_APP_MESSAGING_SENDER_ID,
  appId: credentials.REACT_APP_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebase_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);