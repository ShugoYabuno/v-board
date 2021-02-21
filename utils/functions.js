import Vue from "vue"

export const customUtil = {
  methods: {
    async redirectCheckUser() {
      if (!process.client) return
      let vuex = JSON.parse(localStorage.getItem("vuex")) || {}
      if (!vuex) return
      if (!vuex.isAuthed) this.$router.push("/")
      return
    },
    async confirmDialog(_message) {
      let isProceed = await this.$dialog.confirm({
        title: _message,
      },{
        okText: "はい",
        cancelText: "いいえ",
      })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
      return isProceed
    },
    switchVisibleSidebar() {
      this.$store.dispatch("switchVisibleSidebar")
    },
    throwAlert(_type, _text) {
      this.$store.commit("isAlertShow", true)
      this.$store.commit("alertType", _type)
      this.$store.commit("alertText", _text)
      setTimeout(() => {
        this.$store.commit("isAlertShow", false)
      }, 3500)
    },
  }
}

Vue.mixin(customUtil)
