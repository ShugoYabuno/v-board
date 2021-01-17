<template>
  <div class="w-screen min-h-screen">
    <UserHeader />
    <div class="min-h-screen w-full pt-14 flex">
      <UserSideBar />
      <div class="flex-grow">
        <nuxt />
        <!-- <Footer /> -->
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "~/components/modules/layouts/headers/UserHeader"
import UserSideBar from "~/components/modules/layouts/UserSideBar"
// import Footer from "~/components/modules/layouts/footers/Footer"

export default {
  components: {
    UserHeader,
    UserSideBar,
    // Footer,
  },
  middleware: "userAuthenticated",
  async mounted() {
    await this.redirectCheckUser()
  }
}
</script>
