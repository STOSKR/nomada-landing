// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAK9QSNYPUiFmzLiDlr6SYvZ9eABHNb8b8",
    authDomain: "nomada-348b8.firebaseapp.com",
    projectId: "nomada-348b8",
    storageBucket: "nomada-348b8.firebasestorage.app",
    messagingSenderId: "162197276145",
    appId: "1:162197276145:web:3795586f3720a7a4d23050",
    measurementId: "G-ZZRHB5GNLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// Exportar los servicios
export { app, analytics, db, functions };