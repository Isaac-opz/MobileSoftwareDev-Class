// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKPyIoGNz4LPgLxvxCfdbH3-8cNZ4l_Qc",
  authDomain: "challenge5-mobdev.firebaseapp.com",
  projectId: "challenge5-mobdev",
  storageBucket: "challenge5-mobdev.firebasestorage.app",
  messagingSenderId: "165072253889",
  appId: "1:165072253889:web:1fcb20d02bf60c983b3540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };