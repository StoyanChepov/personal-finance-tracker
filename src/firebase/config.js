import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./credentials";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const projectFirestore = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
