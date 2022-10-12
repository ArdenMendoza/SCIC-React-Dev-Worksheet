// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiW8BS1xUWGQuIOcPM5kPwaIGLVeqYhq4",
  authDomain: "todoapp-ba18a.firebaseapp.com",
  projectId: "todoapp-ba18a",
  storageBucket: "todoapp-ba18a.appspot.com",
  messagingSenderId: "590029479876",
  appId: "1:590029479876:web:c3f1b8d4a3956cfafb4e91",
  measurementId: "G-SSTP57038Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseDb = getFirestore(app);
export const firebaseAuth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
