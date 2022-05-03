import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "groupe-3-de3c6.firebaseapp.com",
  projectId: "groupe-3-de3c6",
  storageBucket: "groupe-3-de3c6.appspot.com",
  messagingSenderId: "347909167477",
  appId: "1:347909167477:web:95a3c6de193148bbdadb3c",
  measurementId: "G-VT5FTGQVSP",
};
//const analytics = getAnalytics(firebaseApp);
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
