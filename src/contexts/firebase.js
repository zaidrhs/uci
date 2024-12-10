// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'; // استخدام API المودول الجديد
import { getFirestore, collection, addDoc, onSnapshot, Timestamp, query, orderBy } from 'firebase/firestore'; // تأكد من استيراد query و orderBy

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCKDUqF6GKpUIKEJAzlkk2ppCvD48OORE",
  authDomain: "ucichem-187a2.firebaseapp.com",
  projectId: "ucichem-187a2",
  storageBucket: "ucichem-187a2.firebasestorage.app",
  messagingSenderId: "89103838087",
  appId: "1:89103838087:web:a4c52822cb21f7c71e8122",
  measurementId: "G-WYCRBEPGK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize auth
const auth = getAuth(app); // تهيئة auth هنا

// الآن يمكنك تصدير auth مع باقي الدوال
export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup };
export { db, collection, addDoc, onSnapshot, Timestamp, query, orderBy }; // تصدير query و orderBy
