import Vue from "vue"
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

export const state = () => ({
  uploadTasks: []
})

export const mutations = {
  updateUploadTasks (state, payload) {
    const { index, task } = payload

    Vue.set(state.uploadTasks, index, task)
  },
  removeUploadTasks (state, payload) {
    state.uploadTasks = []
  }
}

export const actions = {
  async upload(context, value) {
    const { fileVideos, publicTeamId } = value

    const uploadStatus = await new Promise((resolve, reject) => {
      let counter = 0

      Object.keys(fileVideos).forEach(async (_key, _index) => {
        const file = fileVideos[_key]
        // console.log(file)
        const data = {
          name: file.name,
          publicTeamId
        }
        const resServiceAdd = await firestoreService.add("videos", data)

        // console.log(resServiceAdd)

        const { documentId } = resServiceAdd

        const storageRef = firebase.storage().ref()
        const ref = storageRef.child(`videos/${documentId}`)

        const uploadTask = ref.put(file)
        console.log(uploadTask)
        uploadTask.on("state_changed", function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log("Upload is " + progress + "% done")

          const payload = {
            index: _index,
            task: {
              fileName: file.name,
              progress
            }
          }
          context.commit("updateUploadTasks", payload)

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // console.log("Upload is paused")
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // console.log("Upload is running")
              break
          }
        }, function(error) {
          // Handle unsuccessful uploads
        }, async function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          //   console.log("File available at", downloadURL)
          // })
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
    })

    context.commit("removeUploadTasks")

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

export const getters = {
  uploadTasks (state) {
    return state.uploadTasks
  },
}
