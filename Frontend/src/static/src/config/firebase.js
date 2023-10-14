// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCRybRXdyBX7gKp75M4W1z0Dwc_Kuclm0",
  authDomain: "sustainify-c6b5d.firebaseapp.com",
  projectId: "sustainify-c6b5d",
  storageBucket: "sustainify-c6b5d.appspot.com",
  messagingSenderId: "669494898315",
  appId: "1:669494898315:web:9b5fed5df7647bd1daae8e",
  measurementId: "G-K1BKRWZKWF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);