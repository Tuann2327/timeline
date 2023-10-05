// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmsw-XWgmJEDSJWSaKrGFihx7hCt4MGhc",
  authDomain: "timelinememo-ba189.firebaseapp.com",
  projectId: "timelinememo-ba189",
  storageBucket: "timelinememo-ba189.appspot.com",
  messagingSenderId: "440148032364",
  appId: "1:440148032364:web:2d2b993fa0d2a85d605149",
  measurementId: "G-LLY30YEW4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export {app,db,storage};