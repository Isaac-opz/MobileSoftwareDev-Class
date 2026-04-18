import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import { initializeApp } from "firebase/app";

// Configuración base de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlbAftjZt1lRqu6n8u-epcFDw3PpO80Rg",
  authDomain: "challenge6-mobdev.firebaseapp.com",
  databaseURL: "https://challenge6-mobdev-default-rtdb.firebaseio.com",
  projectId: "challenge6-mobdev",
  storageBucket: "challenge6-mobdev.firebasestorage.app",
  messagingSenderId: "959660132534",
  appId: "1:959660132534:web:771b6eba5e2c0b4ea97e17"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, db, realtimeDb };
