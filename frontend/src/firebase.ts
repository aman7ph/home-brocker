import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "marakibetoch.firebaseapp.com",
  projectId: "marakibetoch",
  storageBucket: "marakibetoch.appspot.com",
  messagingSenderId: "816938436795",
  appId: "1:816938436795:web:9cb80438198f2ad612019e",
};

export const app = initializeApp(firebaseConfig);
