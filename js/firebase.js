// firebase.js
// Firebase-ийг эхлүүлж, бусад модулиудад ашиглах auth/db объектуудыг гаргана.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-analytics.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, collection,
  addDoc, updateDoc, deleteDoc, onSnapshot, query
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDljqSMsRZOABFCIS8K7xu1CEFLWBsjzRQ",
  authDomain: "hurguur-test.firebaseapp.com",
  projectId: "hurguur-test",
  storageBucket: "hurguur-test.firebasestorage.app",
  messagingSenderId: "710633544124",
  appId: "1:710633544124:web:ce512a5856d652675b73b9",
  measurementId: "G-77PK4SVG2V"
};

export const app       = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth      = getAuth(app);
export const db        = getFirestore(app);

// Хэрэглэгчийг нэргүйгээр (anonymous) нэвтрүүлнэ.
// PIN шалгах өөрийн логикоо (4 оронтой код) auth.js/state.js дотроо хэвээр хадгална.
export function ensureSignedIn() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        signInAnonymously(auth)
          .then((cred) => resolve(cred.user))
          .catch((err) => reject(err));
      }
    });
  });
}

export {
  doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, onSnapshot, query
};
