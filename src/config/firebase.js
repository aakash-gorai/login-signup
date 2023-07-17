import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDb7eXZZJyetBvD09j_MNWUg53wpZvwHKw",
  authDomain: "login-signup-project-b7eba.firebaseapp.com",
  projectId: "login-signup-project-b7eba",
  storageBucket: "login-signup-project-b7eba.appspot.com",
  messagingSenderId: "346443659475",
  appId: "1:346443659475:web:481ff0333f4dd2be1e7c26",
  measurementId: "G-7CLXF6T0KZ",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
