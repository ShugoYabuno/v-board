<template>
  <header class="fixed top-0 right-0 left-0 w-full h-12 px-4 z-10 bg-opacity-90 bg-gray-20">
    <nav
      class="flex-i-center h-full w-full mx-auto text-primary">
      <MenuBrand />
      <div
        class="flex-i-center ml-auto h-full">
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
        <div class="w-9 h-9 rounded-full overflow-hidden object-cover">
          <img
            :src="`${profileIcon}`"
            alt="ユーザーアイコン"
            class="object-cover">
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MenuBrand from "~/components/parts/MenuBrand"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faSignOutAlt)

export default {
  components: {
    FontAwesomeIcon,
    MenuBrand
  },
  data() {
    return {
      profileIcon: "",
      // isLoaded: false
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
