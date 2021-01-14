<template>
  <nav
    v-if="isLoaded"
    class="flex-i-center h-full w-full mx-auto text-secondary-20">
    <nuxt-link
      to="/"
      class="flex-i-center font-semibold text-2xl h-5/6 px-3 rounded transition hover:bg-primary-60">
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
        class="flex-i-center h-5/6 px-3 rounded transition hover:bg-primary-60"
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
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faBars)
library.add(faSignOutAlt)

export default {
  components: { FontAwesomeIcon },
  props: {
    isLoaded: Boolean
  },
  data() {
    return {
      profileIcon: ""
    }
  },
  mounted() {
    const userInfo = this.$store.getters["userInfo"]
    this.profileIcon = userInfo.photoURL
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut")
      this.$router.push("/")
    }
  },
}
</script>
