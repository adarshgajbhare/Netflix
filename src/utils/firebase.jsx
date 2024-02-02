// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeMvJ5Rk9dt3K6uTeaVlvlBA76Dbl50k8",
  authDomain: "netflix-e7ab9.firebaseapp.com",
  projectId: "netflix-e7ab9",
  storageBucket: "netflix-e7ab9.appspot.com",
  messagingSenderId: "1005550653082",
  appId: "1:1005550653082:web:eaeec3b3dd887b17791923",
  measurementId: "G-BFXQ1H9TWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();