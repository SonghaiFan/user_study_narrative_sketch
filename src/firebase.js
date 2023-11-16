// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYmcZgqYwxWNadh58xIk3kqOCouCZSLkI",
  authDomain: "user-study-narrative-sketch.firebaseapp.com",
  databaseURL:
    "https://user-study-narrative-sketch-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "user-study-narrative-sketch",
  storageBucket: "user-study-narrative-sketch.appspot.com",
  messagingSenderId: "32499840817",
  appId: "1:32499840817:web:801ef01f58c7792f122210",
  measurementId: "G-TMMZ3NTWHF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const auth = getAuth(app);
// export const fs = getFirestore(app);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
