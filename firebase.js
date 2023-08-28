// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADtxybKAWKL5BcJxs5zmy1ksqybkWg9eg",
  authDomain: "user-study-380703.firebaseapp.com",
  projectId: "user-study-380703",
  storageBucket: "user-study-380703.appspot.com",
  messagingSenderId: "125710089721",
  appId: "1:125710089721:web:ffcbf1b247079e3ffdd128",
  measurementId: "G-TZ7MFXZ0EM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storeUser = async (user) => {
    const userRef = db.collection('users').doc(user.userId);
    await userRef.set(user);
  };

storeUser

