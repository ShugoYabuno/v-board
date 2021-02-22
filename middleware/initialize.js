export default async function ({ store, params }) {
  if (params.teamSlug) {
    await store.dispatch("setTeamInfoBySlug", {
      teamSlug: params.teamSlug
    })
  }
  if (process.client) {
    await store.dispatch("initial")
    if (params.videoId) {
      await store.dispatch("isVideoShow", true)
    } else {
      await store.dispatch("isVideoShow", false)
    }
  }
}
