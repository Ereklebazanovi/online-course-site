// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHDQ1kHPIlReqK2zgysjmQxPvnvIl1kcU",
  authDomain: "onlinecourses-2894c.firebaseapp.com",
  projectId: "onlinecourses-2894c",
  storageBucket: "onlinecourses-2894c.appspot.com", // ← .appspot.com
  messagingSenderId: "546233525742",
  appId: "1:546233525742:web:e5bd2d7da60c5fd3679aff",
  measurementId: "G-D2EZKLXQLV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
