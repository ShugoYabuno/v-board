<template>
  <div class="container h-full">
    <input
      ref="fileVideo"
      type="file"
      accept="video/*"
      @change="handleChangeVideo">
    <video-player
      v-if="videoOptions"
      :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "~/components/Atoms/VideoPlayer.vue"

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      restaurants: [],
      videoInput: "",
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src:
              "https://video-share-raw-data.s3.amazonaws.com/post/Lh5NGl7Msc6HucgbQ45x",
            type: "video/mp4",
          },
        ],
      },
    }
  },
  async mounted() {
    // const firebaseParams = {
    //   col1: "restaurants",
    //   col1Id: this.$route.params.id,
    // }
    // const response = await this.$store.dispatch("db/getColId", firebaseParams)
    // this.restaurants = response
    // console.log(this.restaurants)
    // console.log(process.env.AWS_ACCESSKEYID)
    // console.log(process.env.AWS_SECRETACCESSKEY)
  },
  methods: {
    getFileVideo() {
      const files = this.$refs.fileVideo
      const fileVideo = files.files[0]

      return fileVideo
    },
    async handleChangeVideo() {
      console.log("テスト")
      const fileVideo = this.getFileVideo()
      console.log(fileVideo)

      if (fileVideo.type.startsWith("video/")) this.videoS3Upload()
    },
    async videoS3Upload() {
      const fileVideo = this.getFileVideo()

      const response = await this.$store.dispatch("video/upload", { fileVideo })

      console.log(response)
    },
  },
  // async getThumbnailS3(_name) {
  //   let getThumb = ""
  //   if (this.videoInput) {
  //     const files = this.$refs.fileVideo
  //     const fileVideo = files.files[0]
  //     const fileBase64 = await this.getBase64(fileVideo)
  //     console.log(fileBase64)
  //     getThumb = await this.videoS3Upload(_name, fileBase64)
  //     console.log(getThumb)
  //   }
  //   return getThumb
  // },
  // getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(file)
  //     reader.onload = () => resolve(reader.result)
  //     reader.onerror = (error) => reject(error)
  //   })
  // },
}
</script>
