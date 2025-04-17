// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ9K4yy3c4IZX3ZweAatCeFp0jlWMPlKc",
  authDomain: "focusflow-e84c8.firebaseapp.com",
  projectId: "focusflow-e84c8",
  storageBucket: "focusflow-e84c8.firebasestorage.app",
  messagingSenderId: "68494832024",
  appId: "1:68494832024:web:e99a4575b442d58796bbed"
};
  




// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebase_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

