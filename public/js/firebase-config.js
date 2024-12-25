// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8WBZTBhkCYgeMyc7HNNWXKxSUKwjwUxo",
    authDomain: "camp-app-d5aaf.firebaseapp.com",
    projectId: "camp-app-d5aaf",
    storageBucket: "camp-app-d5aaf.firebasestorage.app",
    messagingSenderId: "682322034428",
    appId: "1:682322034428:web:66b1c3f7f77fd9fe39a179",
    measurementId: "G-1V8YB286LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 