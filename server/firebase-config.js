// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_UoQOmfJZCAd1eG1wVjlNiJ7UKanXbTs",
  authDomain: "uniadmin-a8d63.firebaseapp.com",
  projectId: "uniadmin-a8d63",
  storageBucket: "uniadmin-a8d63.appspot.com",
  messagingSenderId: "1027669035787",
  appId: "1:1027669035787:web:af1caf713fec15482fb00e",
  measurementId: "G-YHLSDCRZ6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const tarp_orders_ref = collection(db, "tarp_orders");

export {db, tarp_orders_ref, getDocs, addDoc, doc, deleteDoc, updateDoc};