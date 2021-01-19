<template>
  <div>
    <label
      for="uploader"
      class="flex-ij-center w-8/12 rounded-full mx-auto p-3 bg-secondary text-white hover:shadow-lg">
      <font-awesome-icon
        icon="file-upload"
        class="fa-2x" />
      <p class="ml-2">Upload</p>
    </label>
    <input
      id="uploader"
      ref="fileVideos"
      type="file"
      accept="video/mp4"
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
    async handleChangeVideos() {
      const fileVideos = this.getFileVideos()
      const team = this.$store.getters["teamInfo"]

      const resUpload = await this.$store.dispatch("video/upload", {
        fileVideos,
        publicTeamId: team.documentId
      })

      this.$store.dispatch("videoUploaded")
    },
  },
}
</script>
