import { firestore } from "~/plugins/firebase"
import firestoreService from "~/plugins/firestoreService"

export const state = () => ({
  isAuthed: "",
  // googleAccessToken: "",
  user_info: {}
})

export const mutations = {
  isAuthed (state, payload) {
    state.isAuthed = payload
  },
  // googleAccessToken(state, payload) {
  //   state.googleAccessToken = payload
  // },
  userInfo (state, payload) {
    state.user_info = payload
  }
}
export const actions = {
  logIn (context, value) {
    context.commit("isAuthed", true)
  },
  logOut (context, value) {
    context.commit("isAuthed", false)
  },
  async completeGoogleAuth (context, value) {
    const { userInfo } = value

    const resUsers = await firestore.collection("users").where("google_uid", "==", userInfo.google_uid).get()
    if (!resUsers) { return }

    if (resUsers.docs.length === 0) {
      await firestoreService.add("users", userInfo)
    }

    context.commit("userInfo", value.userInfo)
  },
  async firestoreServiceAdd (context, value) {
    const { collectionName, data } = value
    const res = await firestoreService.add(collectionName, data)
    if (!res) { return }

    return res
  },
  async addTeam (context, value) {
    const { teamInfo } = value

    const resTeamsFind = await firestore.collection("teams").where("slug", "==", teamInfo.slug).get()
    if (!resTeamsFind) { return }

    if (resTeamsFind.docs.length === 0) {
      const resAddTeam = await firestoreService.add("teams", teamInfo)
      if (!resAddTeam) { return }

      return {
        status: "success",
        resFirestore: resAddTeam
      }
    } else if (resTeamsFind.docs.length >= 1) {
      return {
        status: "error",
        message: "Slug is exist"
      }
    }

    return {
      status: "error"
    }
  },
  async findTeamBySlug (context, value) {
    const { slug } = value

    const teams = await firestore
      .collection("teams")
      .where("slug", "==", slug)
      .get()
      .then(function (querySnapShot) {
        return querySnapShot.docs.map(doc => {
          return {
            documentId: doc.id,
            data: doc.data()
          }
        })
      })

    return teams
  },
}

export const getters = {
  isAuthed (state) {
    return state.isAuthed
  }
}
