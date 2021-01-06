<template>
  <div class="w-screen min-h-screen">
    <BaseHeader />
    <div class="w-full pt-14 flex">
      <UserSideBar />
      <div class="flex-grow">
        <nuxt />
        <!-- <Footer /> -->
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "~/components/layouts/headers/BaseHeader"
import UserSideBar from "~/components/layouts/UserSideBar"
// import Footer from "~/components/layouts/footers/Footer"

export default {
  components: {
    BaseHeader,
    UserSideBar,
    // Footer,
  },
  middleware: "userAuthenticated",
  async mounted() {
    await this.redirectCheckUser()
  }
}
</script>
