<template>
  <div class="w-screen h-screen pt-12 overflow-y-scroll">
    <UserHeader />
    <SpSideBar class="block md:hidden" />
    <div class="flex w-full h-full">
      <!-- pc用 -->
      <PcSideBar class="hidden md:block" />
      <div class="flex-grow h-full overflow-scroll">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "~/components/modules/layouts/headers/UserHeader"
import SpSideBar from "~/components/modules/layouts/sidebar/SpSideBar"
import PcSideBar from "~/components/modules/layouts/sidebar/PcSideBar"
// import Footer from "~/components/modules/layouts/footers/Footer"

export default {
  components: {
    UserHeader,
    SpSideBar,
    PcSideBar,
    // Footer,
  },
  middleware: "userAuthenticated",
  async mounted() {
    await this.redirectCheckUser()
  }
}
</script>
