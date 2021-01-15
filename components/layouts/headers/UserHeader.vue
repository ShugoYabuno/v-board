<template>
  <header class="fixed top-0 w-full h-14 z-10 bg-gray-10 shadow-md">
    <nav
      class="flex-i-center h-full w-full mx-auto px-2 text-primary">
      <nuxt-link
        to="/"
        class="flex-i-center font-semibold text-2xl h-5/6 px-3 rounded transition hover:bg-primary-10">
        Vboard
      </nuxt-link>
      <!-- <font-awesome-icon icon="bars" class="ml-auto fa-lg text-secondary-20" /> -->
      <div
        class="flex-i-center ml-auto h-full">
        <div class="h-9 w-9">
          <div class="w-full h-full rounded-full overflow-hidden object-cover">
            <img
              :src="`${profileIcon}`"
              alt="アバターの画像">
          </div>
        </div>
        <button
          class="flex-i-center h-5/6 px-3 rounded transition hover:bg-primary-10"
          @click="logOut()">
          <p class="mr-2 text-lg">
            ログアウト
          </p>
          <font-awesome-icon
            icon="sign-out-alt"
            class="ml-auto fa-lg" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faBars)
library.add(faSignOutAlt)

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      profileIcon: "",
      // isLoaded: false
    }
  },
  mounted() {
    const userInfo = this.$store.getters["userInfo"]
    this.profileIcon = userInfo.photoURL
    // this.isLoaded = true
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut")
      this.$router.push("/")
    }
  },
}
</script>
