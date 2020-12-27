export default function ({ store, redirect }) {
  if (store.state.isAuthed) {
    return redirect("/teams")
  }
}
