import Vue from "vue"
import { firebase, firestore } from "~/plugins/firebase"
import firestoreService from "~/plugins/firestoreService"

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
    const { fileVideos, publicTeamId, uploaderUserId } = value

    const uploadStatus = await new Promise((resolve, reject) => {
      let counter = 0

      Object.keys(fileVideos).forEach(async (_key, _index) => {
        const file = fileVideos[_key]
        const data = {
          title: file.name,
          publicTeamId,
          uploaderUserId
        }
        const resServiceAdd = await firestoreService.add("videos", data)

        const { documentId } = resServiceAdd

        const storageRef = firebase.storage().ref()
        const ref = storageRef.child(`videos/${documentId}`)

        const uploadTask = ref.put(file)

        uploadTask.on("state_changed", function(snapshot){
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

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
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
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

    return {
      status: "completed"
    }
  },
  async getByTeam (context, value) {
    const { teamId } = value

    const videos = await firestore
      .collection("videos")
      .where("publicTeamId", "==", teamId)
      .orderBy("createdAt", "desc")
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
