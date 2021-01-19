<template>
  <div class="flex text-primary">
    <button
      class="w-11 h-11 rounded-full hover:bg-primary-10"
      @click="switchVisibleSidebar()">
      <font-awesome-icon
        icon="bars"
        class="fa-lg" />
    </button>
    <nuxt-link
      :to="`/teams${teamSlug}`"
      class="flex-i-center font-semibold text-2xl h-11 ml-2 px-3 rounded transition hover:bg-primary-10">
      Vboard
    </nuxt-link>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faBars)

export default {
  components: {
    FontAwesomeIcon
  },
  // props: {
  //   switchVisibleSidebar: {
  //     type: Function,
  //     default: () => {}
  //   }
  // },
  data() {
    return {
      teamSlug: ""
    }
  },
  async mounted() {
    const teamInfo = this.$store.getters["teamInfo"]
    if (teamInfo.slug) this.teamSlug = `/${teamInfo.slug}`
  }
}
</script>
