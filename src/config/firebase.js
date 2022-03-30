import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDy6xh5LKMjdBX48S8yJokOD-3TxT2GZVE",
    authDomain: "fishbook-9973e.firebaseapp.com",
    databaseURL: "https://fishbook-9973e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fishbook-9973e",
    storageBucket: "fishbook-9973e.appspot.com",
    messagingSenderId: "125057334032",
    appId: "1:125057334032:web:1429cd44fb7cef4e1cc395"
  };



const app = initializeApp(firebaseConfig);
var db = getDatabase(app);
var storage = getStorage(app);

export { db,storage };