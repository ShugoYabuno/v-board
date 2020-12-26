import { firestore } from "~/plugins/firebase"
import db from "~/plugins/db"

export const state = () => ({
  isSigned: "",
  // googleAccessToken: "",
  user_info: {}
})

export const mutations = {
  isSigned (state, payload) {
    state.isSigned = payload
  },
  // googleAccessToken(state, payload) {
  //   state.googleAccessToken = payload
  // },
  userInfo (state, payload) {
    state.user_info = payload
  }
}
export const actions = {
  signIn (context, value) {
    context.commit("isSigned", true)
  },
  signOut (context, value) {
    context.commit("isSigned", false)
  },
  async completeGoogleAuth (context, value) {
    const { userInfo } = value

    const resUsers = await firestore.collection("users").where("google_uid", "==", userInfo.google_uid).get()
    if (!resUsers) { return }

    if (resUsers.docs.length === 0) {
      await db.add("users", userInfo)
    }

    // context.commit("googleAccessToken", value.googleAccessToken)
    context.commit("userInfo", value.userInfo)
  },
  async dbAdd (context, value) {
    const { collectionName, data } = value
    const res = await db.add(collectionName, data)
    if (!res) { return }

    return res
  },
  async teamsAdd (context, value) {
    const { teamInfo } = value

    const resTeamsFind = await firestore.collection("teams").where("slug", "==", teamInfo.slug).get()
    if (!resTeamsFind) { return }

    if (resTeamsFind.docs.length === 0) {
      const resTeamsAdd = await db.add("teams", teamInfo)
      if (!resTeamsAdd) { return }

      return {
        status: "success",
        resFirestore: resTeamsAdd
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
  }
}

export const getters = {
  isSigned (state) {
    return state.isSigned
  }
}
