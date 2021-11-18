// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8LPMcFHC3uYebeYiubU7C2WknTIXLiug",
  authDomain: "church-calendar-1e543.firebaseapp.com",
  databaseURL: "https://church-calendar-1e543.firebaseio.com",
  projectId: "church-calendar-1e543",
  storageBucket: "church-calendar-1e543.appspot.com",
  messagingSenderId: "278377666917",
  appId: "1:278377666917:web:167f791e596d394240e98c",
  measurementId: "G-4LE9VPJ7DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const getChangeRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
}