import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCt4Vd8WVjM7zryB7p1Nv7kYT7Xpmx0k4o",
    authDomain: "ferro-market-app.firebaseapp.com",
    projectId: "ferro-market-app",
    storageBucket: "ferro-market-app.firebasestorage.app",
    messagingSenderId: "882998050268",
    appId: "1:882998050268:web:3ff4212d99d4ba7100a319"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
