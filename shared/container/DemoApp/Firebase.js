import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {};

const firebaseConfig = {
  apiKey: "AIzaSyAfWZFc1GyEQ5AKuJCi3HhYNB0I-RJpQm8",
  authDomain: "sorabel-2090f.firebaseapp.com",
  databaseURL: "https://sorabel-2090f.firebaseio.com",
  projectId: "sorabel-2090f",
  storageBucket: "sorabel-2090f.appspot.com",
  messagingSenderId: "198412709310",
  appId: "1:198412709310:web:ead055a91f188764",
};
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
