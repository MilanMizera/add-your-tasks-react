// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvVKs4ut0K360j2ANB_GGao6cC4GjONcE",
  authDomain: "add-your-tasks.firebaseapp.com",
  projectId: "add-your-tasks",
  storageBucket: "add-your-tasks.appspot.com",
  messagingSenderId: "1042257964243",
  appId: "1:1042257964243:web:1fe414cdb1cb1062ae7826",
  measurementId: "G-K1XP3Q58QT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

export {app, auth}