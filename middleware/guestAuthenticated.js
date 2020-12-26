export default function ({ store, error, redirect }) {
  if (store.state.isSigned) {
    return redirect("/teams")
  }
}
