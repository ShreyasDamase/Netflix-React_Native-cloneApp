import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyCW-O6WaXX2ck4kw5hBEWvEj97MhrdOGE0",
  authDomain: "netflix-project-45140.firebaseapp.com",
  projectId: "netflix-project-45140",
  storageBucket: "netflix-project-45140.firebasestorage.app",
  messagingSenderId: "393846544231",
  appId: "1:393846544231:web:88c56ca98209e108ebc1c2",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Ensure persistence is handled by AsyncStorage
});

// Export the auth instance
export { auth };
