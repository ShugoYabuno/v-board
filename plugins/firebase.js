import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
import firebaseConfig from "~/firebaseConfig"

if (!firebase.apps.length) {
  const config = firebaseConfig()
  firebase.initializeApp(config)
}

const firestore = firebase.firestore()

export { firebase, firestore }
