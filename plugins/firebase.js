import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyAt49eVAu3ZVWhYvktYDq8vGWFWsVBRiag",
    authDomain: "video-share-d1a94.firebaseapp.com",
    databaseURL: "https://video-share-d1a94.firebaseio.com",
    projectId: "video-share-d1a94",
    storageBucket: "video-share-d1a94.appspot.com",
    messagingSenderId: "91171756450",
  }
  firebase.initializeApp(config)
}

const db = firebase.firestore()
export { firebase, db }
