// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA1EUXE55iUjSbF0wm1jNgHiCGVl_iSQa4",
    authDomain: "animarama.firebaseapp.com",
    projectId: "animarama",
    storageBucket: "animarama.appspot.com",
    messagingSenderId: "500824089939",
    appId: "1:500824089939:web:05dda4819c9fd8dabf6da6",
    measurementId: "G-WS67L8JXF0"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();
