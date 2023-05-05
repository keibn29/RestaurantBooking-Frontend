import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOlas2Xvd7PCqkatjD2N72b6nWtZ-l4QA",
  authDomain: "restaurant-booking-chat-app.firebaseapp.com",
  projectId: "restaurant-booking-chat-app",
  storageBucket: "restaurant-booking-chat-app.appspot.com",
  messagingSenderId: "264357301624",
  appId: "1:264357301624:web:743dd8f289cfbe64b8cc8d",
  measurementId: "G-4RT4B1F1C7",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();

if (window.location.hostname === process.env.REACT_APP_LOCALHOST) {
  db.useEmulator(
    process.env.REACT_APP_LOCALHOST,
    process.env.REACT_APP_FIRESTORE_PORT
  );
}

export default firebase;
