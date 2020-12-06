<template>
  <div class="container">
    <input
      ref="fileVideo"
      type="file"
      accept="video/*"
      @change="handleChangeVideo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      videoInput: "",
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
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
