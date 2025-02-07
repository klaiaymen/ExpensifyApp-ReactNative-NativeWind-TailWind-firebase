// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE1DwLHwVOZ02CKtWcWSHEdk6fEh9BNoI",
  authDomain: "expensify-21e95.firebaseapp.com",
  projectId: "expensify-21e95",
  storageBucket: "expensify-21e95.firebasestorage.app",
  messagingSenderId: "152363616320",
  appId: "1:152363616320:web:18c42ff159209781e8b7a5",
  measurementId: "G-4KELMSQVHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


export const db = getFirestore(app);
export const auth= getAuth(app);
export const tripsRef = collection(db , 'trips')
export const expensesRef = collection(db , 'expenses')
export default app;