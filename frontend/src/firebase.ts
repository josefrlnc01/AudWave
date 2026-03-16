// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "transcriber-ai-8308c.firebaseapp.com",
  projectId: "transcriber-ai-8308c",
  storageBucket: "transcriber-ai-8308c.firebasestorage.app",
  messagingSenderId: "989638410399",
  appId: "1:989638410399:web:857afd4f901e2560ac62aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}