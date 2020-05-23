import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyC4SKXhNDXtqDMTF6Ju1ddrCxp7Lt1_KF4',
    authDomain: 'team-to-do-e446e.firebaseapp.com',
    databaseURL: 'https://team-to-do-e446e.firebaseio.com',
    projectId: 'team-to-do-e446e',
    storageBucket: 'team-to-do-e446e.appspot.com',
    messagingSenderId: '535572049946',
  }
  firebase.initializeApp(config)
}

const db = firebase.firestore()
export { firebase, db }
