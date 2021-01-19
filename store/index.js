import { firestore } from "~/plugins/firebase"
import firestoreService from "~/plugins/firestoreService"

export const state = () => ({
  isAuthed: "",
  isVisibleSidebar: false,
  sentryVideoUpload: false,
  // googleAccessToken: "",
  userInfo: {},
  teamInfo: {},
})

export const mutations = {
  isAuthed (state, payload) {
    state.isAuthed = payload
  },
  // googleAccessToken(state, payload) {
  //   state.googleAccessToken = payload
  // },
  userInfo (state, payload) {
    state.userInfo = payload
  },
  teamInfo (state, payload) {
    state.teamInfo = payload
  },
  switchVideoUpload (state, payload) {
    state.sentryVideoUpload = !state.sentryVideoUpload
  },
  switchVisibleSidebar (state, payload) {
    state.isVisibleSidebar = !state.isVisibleSidebar
  },
  isVisibleSidebar (state, payload) {
    state.isVisibleSidebar = payload
  },
}
export const actions = {
  initial (context, value) {
    context.commit("isVisibleSidebar", false)
  },
  logIn (context, value) {
    context.commit("isAuthed", true)
  },
  logOut (context, value) {
    context.commit("isAuthed", false)
    context.commit("userInfo", {})
    context.commit("teamInfo", {})
  },
  async videoUploaded(context, value) {
    context.commit("switchVideoUpload")
  },
  async setUserInfo (context, value) {
    const { userInfo } = value

    const resUsers = await firestore.collection("users").where("googleUid", "==", userInfo.googleUid).get()
    if (!resUsers) { return }

    let user = {}
    if (resUsers.docs.length === 0) {
      user = await firestoreService.add("users", userInfo)
    } else {
      user = await firestoreService.doc2data(resUsers.docs[0])
    }

    context.commit("userInfo", user)

    return user
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
        data: resAddTeam
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
  async updateTeam (context, value) {
    const { documentId, teamInfo } = value

    const resTeamsFind = await firestore.collection("teams").where("slug", "==", teamInfo.slug).get()
    if (!resTeamsFind) { return }

    if (resTeamsFind.docs.length === 0 || resTeamsFind.docs[0].id === documentId) {
      const resUpdateTeam = await firestoreService.update("teams", documentId, teamInfo)
      if (!resUpdateTeam) { return }

      return {
        status: "success",
        data: resUpdateTeam
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
            ...doc.data()
          }
        })
      })

    return teams
  },
  async setTeamInfoBySlug (context, value) {
    const { teamSlug } = value

    const teams = await firestore
      .collection("teams")
      .where("slug", "==", teamSlug)
      .get()
      .then(function (querySnapShot) {
        return querySnapShot.docs.map(doc => {
          return {
            documentId: doc.id,
            ...doc.data()
          }
        })
      })

    const {
      documentId,
      iconImageUrl,
      name,
      slug
    } = teams[0]


    context.commit("teamInfo", {
      documentId,
      iconImageUrl,
      name,
      slug
    })

    return
  },
  async fsFind (context, value) {
    const { collectionName, documentId } = value
    const resFind = await firestoreService.find(collectionName, documentId)

    return resFind
  },
  async fsAdd (context, value) {
    const { collectionName, data } = value
    const res = await firestoreService.add(collectionName, data)
    if (!res) { return }

    return res
  },
  async fsUpdate (context, value) {
    const {
      collectionName,
      documentId,
      data
    } = value
    const resUpdate = await firestoreService.update(collectionName, documentId, data)
    if(!resUpdate) return

    return resUpdate
  },
  async fsWhere (context, values) {
    const {
      collectionName,
      key,
      value
    } = values
    const resWhere = await firestoreService.where(collectionName, key, value)
    if(!resWhere) return

    return resWhere
  },
  async setTeamInfo (context, value) {
    const { teamInfo } = value
    context.commit("teamInfo", teamInfo)
  },
  async switchVisibleSidebar (context, value) {
    context.commit("switchVisibleSidebar")
  },
}

export const getters = {
  isAuthed (state) {
    return state.isAuthed
  },
  userInfo (state) {
    return state.userInfo
  },
  teamInfo (state) {
    return state.teamInfo
  },
  sentryVideoUpload (state) {
    return state.sentryVideoUpload
  },
  isVisibleSidebar (state) {
    return state.isVisibleSidebar
  }
}
