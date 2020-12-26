<template>
  <nav
    v-if="isLoaded"
    class="flex-i-center h-full max-w-screen-lg w-full mx-auto text-secondary-2">
    <nuxt-link
      to="/"
      class="flex-i-center font-semibold text-2xl h-5/6 px-3 rounded transition hover:bg-primary-6">
      Vboard
    </nuxt-link>
    <!-- <font-awesome-icon icon="bars" class="ml-auto fa-lg text-secondary-2" /> -->
    <div
      class="flex-i-center ml-auto h-full">
      <button
        class="flex-i-center h-5/6 px-3 rounded transition hover:bg-primary-6"
        @click="signOut()">
        <p class="mr-2 text-lg">
          ログアウト
        </p>
        <font-awesome-icon
          icon="sign-out-alt"
          class="ml-auto fa-lg" />
      </button>
    </div>
  </nav>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faBars)
library.add(faSignOutAlt)

export default {
  components: { FontAwesomeIcon },
  // asyncData() {
  //   return {
  //     isAuth: false,
  //   }
  // },
  // data() {
  //   return {
  //     collapseOnScroll: true,
  //     selectTab: 0,
  //   }
  // },
  props: {
    isLoaded: Boolean
  },
  methods: {
    async signOut() {
      await this.$store.dispatch("signOut")
      this.$router.push("/")
    }
  },
  // mounted() {
  //   firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  //   console.log(this.isAuth)
  // },
}
</script>
