import { initializeApp } from 'firebase/app';
import {  getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArHwS5gUJy7MxPYJVyQwfyEHKw797IpTY",
  authDomain: "trackmybus-67afb.firebaseapp.com",
  projectId: "trackmybus-67afb",
  storageBucket: "trackmybus-67afb.appspot.com",
  messagingSenderId: "1076443312354",
  appId: "1:1076443312354:web:5d4e5f2e5f2e5f2e"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// const db = getDatabase(app);
const auth = getAuth(app)
const db = getFirestore(app);


export {  auth, db};