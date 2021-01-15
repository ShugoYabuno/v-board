<template>
  <header class="fixed top-0 w-full h-14 z-10 px-2 bg-primary shadow-md">
    <nav
      v-if="isLoaded"
      class="flex-i-center h-full w-full mx-auto text-gray-10">
      <nuxt-link
        to="/"
        class="flex-i-center font-semibold text-2xl h-5/6 px-3 rounded transition hover:bg-primary-60">
        Vboard
      </nuxt-link>
      <!-- <font-awesome-icon icon="bars" class="ml-auto fa-lg text-secondary-20" /> -->
      <div
        class="flex-i-center ml-auto h-full">
        <nuxt-link
          v-if="$route.path !== '/sign_in' && $route.path !== '/'"
          to="/sign_in"
          class="flex-i-center h-5/6 px-3 rounded transition hover:bg-primary-60">
          <p class="mr-2 text-lg">
            ログイン
          </p>
          <font-awesome-icon
            icon="sign-in-alt"
            class="ml-auto fa-lg" />
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars, faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faBars)
library.add(faSignInAlt)

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      isLoaded: false
    }
  },
  // computed: {
  //   isShowHeaderContent() {
  //     return this.isLoaded
  //   }
  // },
  mounted() {
    this.isLoaded = true
  }
}
</script>
