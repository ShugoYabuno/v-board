<template>
  <header class="fixed top-0 right-0 left-0 w-full h-12 px-4 z-10 bg-opacity-90 bg-gray-20">
    <nav
      class="flex-i-center h-full w-full mx-auto">
      <MenuBrand />
      <div
        class="flex-i-center ml-auto h-full">
        <button
          class="w-9 h-9"
          @click="switchVisibleUserMenu">
          <CircleImg
            :img-src="userInfo.iconImageUrl"
            alt="ユーザーアイコン" />
        </button>
        <div
          v-if="isVisibleUserMenu"
          class="fixed top-12 right-2 w-52 border-1-solid rounde-sm border-secondary-20 bg-gray-20">
          <button
            class="w-full h-8 hover:bg-primary-10"
            @click="switchVisibleUserMenu()">
            <font-awesome-icon
              icon="chevron-up"
              class="fa-lg text-primary" />
          </button>
          <div class="flex p-2">
            <div class="w-9 h-9">
              <CircleImg
                :img-src="userInfo.iconImageUrl"
                alt="ユーザーアイコン" />
            </div>
            <div class="flex-i-center">
              <p class="ml-2 text-primary-100">
                {{ userInfo.displayName }}
              </p>
            </div>
          </div>
          <nuxt-link
            :to="`/users/${userInfo.documentId}/config`"
            class="flex-i-center h-8 px-2 text-gray-80 hover:bg-primary-10">
            <IconCog />
            <p class="text-sm ml-1">
              ユーザー設定
            </p>
          </nuxt-link>
          <button
            class="flex-ij-center w-full h-10 px-3 rounded text-primary hover:bg-primary-10"
            @click="logOut()">
            <p class="inline-block mr-2 text-lg">
              ログアウト
            </p>
            <font-awesome-icon
              icon="sign-out-alt"
              class="fa-lg" />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MenuBrand from "~/components/parts/MenuBrand"
import IconCog from "~/components/parts/fontawesome/Cog"
import CircleImg from "~/components/parts/CircleImg"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSignOutAlt, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faSignOutAlt)
library.add(faChevronUp)

export default {
  components: {
    FontAwesomeIcon,
    MenuBrand,
    IconCog,
    CircleImg
  },
  data() {
    return {
      isVisibleUserMenu: false,
      userInfo: {}
    }
  },
  computed: {
    gettersVisibleUserMenu() {
      return this.$store.getters["isVisibleUserMenu"]
    }
  },
  watch: {
    gettersVisibleUserMenu(_value) {
      this.isVisibleUserMenu = _value
    }
  },
  async mounted() {
    this.userInfo = await this.$store.getters["userInfo"]
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut")
      this.$router.push("/")
    },
    switchVisibleUserMenu() {
      this.$store.dispatch("switchVisibleUserMenu")
    }
  },
}
</script>
