// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ8SdkUMD7XwKcpFkMYT6lpR_9kGvrJWw",
  authDomain: "foodapp-3f01d.firebaseapp.com",
  databaseURL: "https://foodapp-3f01d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodapp-3f01d",
  storageBucket: "foodapp-3f01d.appspot.com",
  messagingSenderId: "1035512847158",
  appId: "1:1035512847158:web:437683e7db1a6ed1ee7197",
  measurementId: "G-ML5DLGWJZR"
};

// Initialize Firebase
export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
export const store = getStorage(app);

