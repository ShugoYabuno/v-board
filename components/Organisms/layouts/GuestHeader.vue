<template>
  <header class="fixed top-0 w-full h-14 bg-primary shadow-md">
    <nav
      class="flex items-center h-full max-w-screen-lg w-full mx-auto text-secondary-2"
    >
      <p class="font-semibold text-2xl">Vboard</p>
      <!-- <font-awesome-icon icon="bars" class="ml-auto fa-lg text-secondary-2" /> -->
      <div class="flex items-center ml-auto h-full">
        <nuxt-link
          to="/sign_in"
          class="flex items-center h-5/6 px-3 rounded transition hover:bg-primary-6"
        >
          <p class="mr-2 text-lg">Sign In</p>
          <font-awesome-icon icon="sign-in-alt" class="ml-auto fa-lg" />
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
  components: { FontAwesomeIcon },
  methods: {},
  // mounted() {
  //   firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  //   console.log(this.isAuth)
  // },
}
</script>
