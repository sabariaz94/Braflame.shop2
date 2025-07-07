// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfzY03XixRu86o8JraSFuwr9T_YUVzuV4",
  authDomain: "brabliss-web.firebaseapp.com",
  projectId: "brabliss-web",
  storageBucket: "brabliss-web.firebasestorage.app",
  messagingSenderId: "825448878315",
  appId: "1:825448878315:web:3f2a229d3988ee473b2eae",
  measurementId: "G-1TV78SLN7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);