import { firebase, firestore } from "~/plugins/firebase"
import firestoreService from "~/plugins/firestoreService"

const format2base64Data = async (_fileVideo) => {
  const fileBase64 = await new Promise((resolve, reject) => {
    console.log(_fileVideo)
    const reader = new FileReader()
    reader.readAsDataURL(_fileVideo)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
  // const fileData = fileBase64.replace(/^data:\w+\/\w+;base64,/, "")

  return fileBase64
}

export const state = () => {}

export const actions = {
  async upload(context, value) {
    const { fileVideos, publicTeamId } = value

    const uploadStatus = await new Promise((resolve, reject) => {
      let counter = 0
      Object.keys(fileVideos).forEach(async (_key, index) => {
        const file = fileVideos[_key]
        // console.log(file)
        const data = {
          name: file.name,
          publicTeamId
        }
        const resServiceAdd = await firestoreService.add("videos", data)

        console.log(resServiceAdd)

        const { documentId } = resServiceAdd

        const storageRef = firebase.storage().ref()
        const ref = storageRef.child(`videos/${documentId}`)
        const successUpload = await ref.put(file).then(res => res.state === "success")
        if(!successUpload) return

        const videoUrl = await ref.getDownloadURL()
        const contentType = await ref.getMetadata().then(metadata => metadata.contentType)
        const resUpdate = await firestoreService.update("videos", documentId, {
          storageUrl: videoUrl,
          contentType
        })

        counter += 1

        if(counter === fileVideos.length) resolve("success")
      })
    })

    console.log(uploadStatus)

    return {
      status: "completed"
    }
  },
  async getByTeam (context, value) {
    const { teamId } = value
    const videos = await firestore
      .collection("videos")
      .where("publicTeamId", "==", teamId)
      .get()
      .then(function (querySnapShot) {
        return querySnapShot.docs.map(doc => {
          return {
            documentId: doc.id,
            ...doc.data()
          }
        })
      })

    return videos
  }
}
