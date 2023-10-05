// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPixMW65JwEi0wM1wWFip8Dl9ZG11GIEs",
  authDomain: "dubai-report.firebaseapp.com",
  projectId: "dubai-report",
  storageBucket: "dubai-report.appspot.com",
  messagingSenderId: "288704241431",
  appId: "1:288704241431:web:0b955957732cfadc41a152"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
