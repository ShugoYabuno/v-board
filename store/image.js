import { firebase, firestore } from "~/plugins/firebase"
import firestoreService from "~/plugins/firestoreService"

export const state = () => ({})

export const mutations = {}

const iconUpload = async (_value, _iconType) => {
  const { fileImage } = _value

  const file = fileImage

  const fileName = `${Date.now()}${file.name}`

  const storageRef = firebase.storage().ref()
  const ref = storageRef.child(`${_iconType}/${fileName}`)

  await ref.put(file)

  const imageUrl = await ref.getDownloadURL()

  return imageUrl
}

export const actions = {
  async teamIconUpload (context, value) {
    return await iconUpload(value, "teamIcons")
  },
  async userIconUpload (context, value) {
    return await iconUpload(value, "userIcons")
  },
}

export const getters = {}
