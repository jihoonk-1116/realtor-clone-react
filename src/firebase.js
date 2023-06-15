// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB8rah156t_-jSnhQJewKjOjxtyNCGWbs",
  authDomain: "realtor-clone-react-6eb34.firebaseapp.com",
  projectId: "realtor-clone-react-6eb34",
  storageBucket: "realtor-clone-react-6eb34.appspot.com",
  messagingSenderId: "1050737732628",
  appId: "1:1050737732628:web:7f43fc7f10654b2dc2cb01"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();