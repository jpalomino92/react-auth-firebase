import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBz_-NMbXQeScHkqixmjtHXJwbZXI8NO4w",
  authDomain: "react-auth-tailwind-7795e.firebaseapp.com",
  projectId: "react-auth-tailwind-7795e",
  storageBucket: "react-auth-tailwind-7795e.appspot.com",
  messagingSenderId: "29724137975",
  appId: "1:29724137975:web:ef2751ff4e7f826266f6f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}