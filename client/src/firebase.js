
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-5a4fe.firebaseapp.com",
  projectId: "mern-auth-5a4fe",
  storageBucket: "mern-auth-5a4fe.appspot.com",
  messagingSenderId: "248359203204",
  appId: "1:248359203204:web:845ba00cbecd2720a72dd1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);