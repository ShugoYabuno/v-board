<template>
  <div class="w-screen min-h-screen">
    <BaseHeader />
    <div class="w-full pt-14 flex">
      <div class="w-48 bg-gray-30" />
      <div class="flex-grow">
        <nuxt />
        <!-- <Footer /> -->
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "~/components/layouts/headers/BaseHeader"
// import Footer from "~/components/layouts/footers/Footer"

export default {
  components: {
    BaseHeader,
    // Footer,
  },
  middleware: "userAuthenticated",
  async mounted() {
    await this.redirectCheckUser()
  }
}
</script>
