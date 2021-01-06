<template>
  <div>
    <label
      for="uploader"
      class="flex-ij-center w-10/12 rounded-full border-1-solid p-3 shadow bg-secondary border-secondary text-white">
      <font-awesome-icon
        icon="file-upload"
        class="fa-2x" />
      <p class="ml-2">Upload</p>
    </label>
    <input
      id="uploader"
      ref="fileVideos"
      type="file"
      accept="video/*"
      class="hidden"
      multiple
      @change="handleChangeVideos">
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faFileUpload)

export default {
  components: { FontAwesomeIcon },
  props: {
    getVideos: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      videoInput: "",
    }
  },
  methods: {
    getFileVideos() {
      const files = this.$refs.fileVideos
      const fileVideos = files.files

      return fileVideos
    },
    // async handleChangeVideos() {
    //   const fileVideos = this.getFileVideos()

    //   if (fileVideos.type.startsWith("videos/")) this.videosUpload()
    // },
    async handleChangeVideos() {
      console.log("テスト")
      const fileVideos = this.getFileVideos()

      const resUpload = await this.$store.dispatch("video/upload", { fileVideos })

      console.log("upload終了")

      // this.getVideos()
    },
  },
}
</script>
