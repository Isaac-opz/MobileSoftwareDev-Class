import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMwu08atv0efQfjltFlzPhZ3KkEHtYTYo",
  authDomain: "parcial2-misiones.firebaseapp.com",
  projectId: "parcial2-misiones",
  storageBucket: "parcial2-misiones.firebasestorage.app",
  messagingSenderId: "1094271967273",
  appId: "1:1094271967273:web:600d132897a05dc0887c38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, db, realtimeDb };
