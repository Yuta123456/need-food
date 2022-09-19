// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIshxtukerh2_bJv9XbY62SOWO8ZS13vs",
  authDomain: "need-food-9f4ff.firebaseapp.com",
  projectId: "need-food-9f4ff",
  storageBucket: "need-food-9f4ff.appspot.com",
  messagingSenderId: "323102084325",
  appId: "1:323102084325:web:1fb7f620008921e33d980c",
  measurementId: "G-XKMW52K8C3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";
export const auth = getAuth(app);
