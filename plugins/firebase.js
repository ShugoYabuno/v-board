import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

const firebaseConfig = () => {
  if(process.env.NODE_ENV === "production") {
    return {
      apiKey: "AIzaSyChKe7aXLONoyHOtQcOJonDYTvLj5HXiWw",
      authDomain: "v-board-8cece.firebaseapp.com",
      projectId: "v-board-8cece",
      storageBucket: "v-board-8cece.appspot.com",
      messagingSenderId: "442714615672",
      appId: "1:442714615672:web:9a5fee9a0ce4d55e5be28d",
      measurementId: "G-NVCWYL7MM5"
    }
  } else {
    return {
      apiKey: "AIzaSyAt49eVAu3ZVWhYvktYDq8vGWFWsVBRiag",
      authDomain: "video-share-d1a94.firebaseapp.com",
      databaseURL: "https://video-share-d1a94.firebaseio.com",
      projectId: "video-share-d1a94",
      storageBucket: "video-share-d1a94.appspot.com",
      messagingSenderId: "91171756450",
      appId: "1:91171756450:web:67f0fa48a017da151a3afb",
      measurementId: "G-MTQPDP7Z5J"
    }
  }
}

if (!firebase.apps.length) {
  const config = firebaseConfig()
  firebase.initializeApp(config)
}

const firestore = firebase.firestore()

export { firebase, firestore }
