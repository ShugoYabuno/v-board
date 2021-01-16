import { firebase, firestore } from "~/plugins/firebase"
import firestoreService from "~/plugins/firestoreService"

export const state = () => ({})

export const mutations = {}

export const actions = {
  async upload (context, value) {
    const { fileImage } = value

    const file = fileImage

    const fileName = `${Date.now()}${file.name}`

    const storageRef = firebase.storage().ref()
    const ref = storageRef.child(`teamIcons/${fileName}`)

    await ref.put(file)

    const imageUrl = await ref.getDownloadURL()

    console.log(imageUrl)

    return imageUrl
  }
}

export const getters = {}
