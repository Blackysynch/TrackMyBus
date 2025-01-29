import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {  auth, db};