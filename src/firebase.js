// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaEBKWvFiT3hMTKhz_DU5k9i2FCip0Mx4",
    authDomain: "imageboard-176a7.firebaseapp.com",
    projectId: "imageboard-176a7",
    storageBucket: "imageboard-176a7.firebasestorage.app",
    messagingSenderId: "848950340650",
    appId: "1:848950340650:web:fd52a1c2805a6829e56753",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Initialize Firestore and store in `db`

// Initialize Storage
const storage = getStorage(app); // Initialize Storage and store in `storage`

// Export Firestore and Storage
export { db, storage };