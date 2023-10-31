import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyArTQWWU-nuHTbms2fPhiV5sthCPSyigHY",
  authDomain: "chatapp-5f92b.firebaseapp.com",
  projectId: "chatapp-5f92b",
  storageBucket: "chatapp-5f92b.appspot.com",
  messagingSenderId: "1051822602973",
  appId: "1:1051822602973:web:2637c7851f193dcfccb934"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// export const db = getFire