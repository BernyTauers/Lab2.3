import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWOQ7CR1UHA9nf2BLOBbd39Y_UMbC6yyA",
  authDomain: "crud-firebase-f2bfd.firebaseapp.com",
  projectId: "crud-firebase-f2bfd",
  storageBucket: "crud-firebase-f2bfd.firebasestorage.app",
  messagingSenderId: "659061921698",
  appId: "1:659061921698:web:a83a046bd1bf23ea9ec4fb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};