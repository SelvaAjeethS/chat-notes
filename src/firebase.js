import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2_jYYs5M2vkxdGSLp1NDJ87pUtThQS_M",
  authDomain: "my-chat-notes.firebaseapp.com",
  databaseURL: "https://my-chat-notes-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-chat-notes",
  storageBucket: "my-chat-notes.firebasestorage.app",
  messagingSenderId: "978948775746",
  appId: "1:978948775746:web:8171adbb9258b51ba2f2db"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => {
    console.log("Logged in anonymously");
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });

export { database, auth };
