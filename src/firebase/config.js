// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`
};

// Initialize Firebase
let app;
try {
    if (!firebaseConfig.projectId) {
        throw new Error('Falta la configuración de Firebase. Verifica tu archivo .env');
    }
    app = initializeApp(firebaseConfig);
} catch (error) {
    // Crear un objeto app vacío para evitar errores en el resto del código
    app = { name: 'placeholder-app' };
}

// Inicializar servicios de Firebase con manejo de errores
let analytics = null;
let db = null;
let functions = null;
let database = null;

try {
    analytics = app.name !== 'placeholder-app' ? getAnalytics(app) : null;
} catch (error) {
    // Error silencioso
}

try {
    db = app.name !== 'placeholder-app' ? getFirestore(app) : null;
} catch (error) {
    // Error silencioso
}

try {
    functions = app.name !== 'placeholder-app' ? getFunctions(app) : null;
} catch (error) {
    // Error silencioso
}

try {
    database = app.name !== 'placeholder-app' ? getDatabase(app) : null;
} catch (error) {
    // Error silencioso
}

// Exportar los servicios
export { app, analytics, db, functions, database };