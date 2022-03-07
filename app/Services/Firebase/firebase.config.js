// Import the functions you need from the SDKs you need
import firebase from "firebase";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyHvOysOuKGS7Wk-ixjbfx_IILBa1ESQM",
  authDomain: "omnix-we-connect.firebaseapp.com",
  projectId: "omnix-we-connect",
  storageBucket: "omnix-we-connect.appspot.com",
  messagingSenderId: "250271841965",
  appId: "1:250271841965:web:6e4036afed6fb9c487d024",
  measurementId: "G-QV0SQ8GG1R"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth(app)


export { app, auth }



