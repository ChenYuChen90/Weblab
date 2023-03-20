import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKs_TMpeaNNKZA1ge5JxJItZ0BY373pEU",
    authDomain: "chatroom-dad3c.firebaseapp.com",
    databaseURL: "https://chatroom-dad3c-default-rtdb.firebaseio.com",
    projectId: "chatroom-dad3c",
    storageBucket: "chatroom-dad3c.appspot.com",
    messagingSenderId: "729497040267",
    appId: "1:729497040267:web:46522074c3d41b3f646b8e",
    measurementId: "G-0YT4TWJQV9"
  };
firebase.initializeApp(firebaseConfig)

export default firebase;