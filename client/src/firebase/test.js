import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('uLGNNE8wcr0FIwuCp9IZ').collection('cartItems')
