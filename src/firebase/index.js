import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyRVpUDu0MW_N-_yatA7z2RP9KgkTdtk4",
    authDomain: "practice-a7a7b.firebaseapp.com",
    databaseURL: "https://practice-a7a7b.firebaseio.com",
    projectId: "practice-a7a7b",
    storageBucket: "practice-a7a7b.appspot.com",
    messagingSenderId: "943750954587",
    appId: "1:943750954587:web:b13984dcf13dcaa468c97e",
    measurementId: "G-LKVX8XPQCV"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};

