// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "REDACTED_KEY",
  authDomain: "skilltrackerapp.firebaseapp.com",
  projectId: "skilltrackerapp",
  storageBucket: "skilltrackerapp.firebasestorage.app",
  messagingSenderId: "112044254862",
  appId: "1:112044254862:web:5f71eca4b19b117afc8bdf",
  measurementId: "G-HCSLNS8RG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth };

