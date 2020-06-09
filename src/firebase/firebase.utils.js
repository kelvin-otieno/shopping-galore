import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAoLChFOdcerAcngfYLnYLBpGR3xpwF-fY",
  authDomain: "crwn-db-ecbd0.firebaseapp.com",
  databaseURL: "https://crwn-db-ecbd0.firebaseio.com",
  projectId: "crwn-db-ecbd0",
  storageBucket: "crwn-db-ecbd0.appspot.com",
  messagingSenderId: "542101871911",
  appId: "1:542101871911:web:16d2dbc83acf3d717cdd02",
  measurementId: "G-8BNGZL0BBR",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
