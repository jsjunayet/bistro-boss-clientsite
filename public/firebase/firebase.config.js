// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVRk-5Mj5zSgfAyKbCvUIIb4N2E9PeU0o",
  authDomain: "finalproject-e4d61.firebaseapp.com",
  projectId: "finalproject-e4d61",
  storageBucket: "finalproject-e4d61.appspot.com",
  messagingSenderId: "384893959274",
  appId: "1:384893959274:web:0eb95385362b40d3455e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);