import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyDvP3zysMWUuOTsuLBQ-DpRxRBcdTBXnYw",
  authDomain: "barter-system-1a9df.firebaseapp.com",
  projectId: "barter-system-1a9df",
  storageBucket: "barter-system-1a9df.appspot.com",
  messagingSenderId: "339633933116",
  appId: "1:339633933116:web:631dbb6b551a0ce20c2c39"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
