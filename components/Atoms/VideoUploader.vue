<template>
  <div>
    <input
      ref="fileVideo"
      type="file"
      accept="video/*"
      @change="handleChangeVideo">
    <button>アップロード</button>
  </div>
</template>

<script>

export default {
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
    getFileVideo() {
      const files = this.$refs.fileVideo
      const fileVideo = files.files[0]

      return fileVideo
    },
    async handleChangeVideo() {
      const fileVideo = this.getFileVideo()

      if (fileVideo.type.startsWith("video/")) this.videoUpload()
    },
    async videoUpload() {
      const fileVideo = this.getFileVideo()

      const resUpload = await this.$store.dispatch("video/upload", { fileVideo })

      this.getVideos()
    },
  },
}
</script>
