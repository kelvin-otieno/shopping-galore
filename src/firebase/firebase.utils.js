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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionName,
  documentsToAdd
) => {
  const collectionRef = firestore.collection(collectionName);
  const batch = firestore.batch();
  documentsToAdd.forEach((doc) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, doc);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (snapshot) => {
  const transformedCollection = snapshot.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  const transformedObject = transformedCollection.reduce((accumulator,collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  },{});
  return transformedObject
};


export const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    },reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
