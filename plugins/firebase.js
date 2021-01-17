import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = require(process.env.FIREBASE_CONFIG_PATH)

if (!firebase.apps.length) {
  const config = firebaseConfig
  firebase.initializeApp(config)
}

const firestore = firebase.firestore()

export { firebase, firestore }
