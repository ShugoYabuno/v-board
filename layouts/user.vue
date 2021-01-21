<template>
  <div class="w-screen h-screen pt-12 overflow-y-scroll">
    <UserHeader />
    <div class="flex w-full h-full">
      <SpSideBar
        class="block"
        :class="{ 'md:hidden': !isVideoShow }" />
      <!-- pc用 -->
      <PcSideBar
        class="hidden"
        :class="{ 'md:block': !isVideoShow }" />
      <div class="flex-grow h-full overflow-scroll">
        <nuxt />
      </div>
    </div>
    <VideoUploadTasks />
  </div>
</template>

<script>
import UserHeader from "~/components/modules/layouts/headers/UserHeader"
import SpSideBar from "~/components/modules/layouts/sidebar/SpSideBar"
import PcSideBar from "~/components/modules/layouts/sidebar/PcSideBar"
import VideoUploadTasks from "~/components/parts/VideoUploadTasks"

export default {
  components: {
    UserHeader,
    SpSideBar,
    PcSideBar,
    VideoUploadTasks,
  },
  middleware: ["userAuthenticated", "initialize"],
  data() {
    return {
      isVideoShow: false,
    }
  },
  computed: {
    gettersIsVideoShow() {
      return this.$store.getters["isVideoShow"]
    }
  },
  watch: {
    gettersIsVideoShow(_value) {
      this.isVideoShow = _value
    }
  },
  async mounted() {
    await this.redirectCheckUser()
    if(this.$route.params && this.$route.params.videoId) {
      this.isVideoShow = true
    }
  }
}
</script>
