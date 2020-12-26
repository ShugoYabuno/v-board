export default function ({ store, error, redirect }) {
  if (!process.client) return
  if (!store.state.isSigned) {
    return redirect("/")
  }
}
