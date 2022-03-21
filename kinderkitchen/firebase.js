// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKGEi8TE2Jbi17-c60tEFvxZjZt19GMgE",
  authDomain: "kinderkitchen-1a5ea.firebaseapp.com",
  databaseURL: "https://kinderkitchen-1a5ea-default-rtdb.firebaseio.com",
  projectId: "kinderkitchen-1a5ea",
  storageBucket: "kinderkitchen-1a5ea.appspot.com",
  messagingSenderId: "356909374453",
  appId: "1:356909374453:web:9e32e440f4f6997c7f5ebc",
  measurementId: "G-V1BYB8JXJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);