import createPersistedState from "vuex-persistedstate"

export default ({ store }) => {
  if (process.client) {
    window.onNuxtReady(() => {
      createPersistedState({
        key: "vuex",
        // paths: ["user", "admin", "cartList", "purchaseInfo", "trackingParams", "trafficParams", "visitPage", "purchasePage", "routeLogs", "setPaymentType", "lp", "diagnosis", "orderInfo"]
      })(store)
    })
    createPersistedState({
      key: "vuex",
      // paths: ["user", "admin", "cartList", "purchaseInfo", "trackingParams", "trafficParams", "visitPage", "purchasePage", "routeLogs", "setPaymentType", "lp", "diagnosis", "orderInfo"]
    })(store)
  }
}
