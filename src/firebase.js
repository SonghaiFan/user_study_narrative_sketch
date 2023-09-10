// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYmcZgqYwxWNadh58xIk3kqOCouCZSLkI",
  authDomain: "user-study-narrative-sketch.firebaseapp.com",
  projectId: "user-study-narrative-sketch",
  storageBucket: "user-study-narrative-sketch.appspot.com",
  messagingSenderId: "32499840817",
  appId: "1:32499840817:web:801ef01f58c7792f122210",
  measurementId: "G-TMMZ3NTWHF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
export const db = getFirestore(app);
