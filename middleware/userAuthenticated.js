export default function ({ store, redirect }) {
  if (!process.client) return
  if (!store.state.isAuthed) {
    return redirect("/")
  }
}
