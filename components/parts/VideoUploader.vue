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
      if(this.isError(fileVideos)) return

      const team = this.$store.getters["teamInfo"]
      const user = this.$store.getters["userInfo"]

      const resUpload = await this.$store.dispatch("video/upload", {
        fileVideos,
        publicTeamId: team.documentId,
        uploaderUserId: user.documentId
      })

      this.$store.dispatch("videoUploaded")
    },
    isError(_fileVideos) {
      const fileVideosArray = Object.keys(_fileVideos).map(_key => _fileVideos[_key])
      if(!fileVideosArray.every(_video => _video.type === "video/mp4")) {
        this.throwAlert("error", "ファイル形式は.mp4のみです")
        return true
      } else {
        return false
      }
    }
  },
}
</script>
