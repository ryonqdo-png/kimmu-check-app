// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgJvqwV5X6Xr6fl1fYieV6uG3lKaaUhGa4",
  authDomain: "duty-calendar-6f60f.firebaseapp.com",
  projectId: "duty-calendar-6f60f",
  storageBucket: "duty-calendar-6f60f.appspot.com",
  messagingSenderId: "161508552559",
  appId: "1:161508552559:web:507d085564fa74e414dc5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
