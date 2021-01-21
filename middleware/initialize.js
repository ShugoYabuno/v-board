export default function ({ store, params }) {
  if (process.client) {
    store.dispatch("initial")
    store.dispatch("setTeamInfoBySlug", {
      teamSlug: params.teamSlug
    })
  }
}
