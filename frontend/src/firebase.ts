// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVs_cS3OBcJoO7K9MKzIoM4SCx75Sj9FA",
  authDomain: "todolistapp-fbd7b.firebaseapp.com",
  projectId: "todolistapp-fbd7b",
  storageBucket: "todolistapp-fbd7b.appspot.com",  // 修正：末尾が .app ではなく .appspot.com
  messagingSenderId: "930116430888",
  appId: "1:930116430888:web:d6c15f362cc11b5192d91d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
