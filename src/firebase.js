// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "insta-next-422206.firebaseapp.com",
  projectId: "insta-next-422206",
  storageBucket: "insta-next-422206.appspot.com",
  messagingSenderId: "488163684323",
  appId: "1:488163684323:web:7618328b7419b515acfad6",
  measurementId: "G-NML3PTFZQG"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);