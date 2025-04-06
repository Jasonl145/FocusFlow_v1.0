// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD1b5Pbwd3hg1QopsT9nWuIkUK_XXebMc",
  authDomain: "fir-test-project-3418d.firebaseapp.com",
  projectId: "fir-test-project-3418d",
  storageBucket: "fir-test-project-3418d.firebasestorage.app",
  messagingSenderId: "1065754351704",
  appId: "1:1065754351704:web:d68c55f4d983c94673922d"
};






// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebase_auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

