<template>
  <h1>テスト</h1>
</template>

<script>
// import axios from "axios"
import AWS from "aws-sdk"

const s3 = new AWS.S3()
s3.config.update({
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  region: process.env.S3_REGION,
})

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
    async handleChangeVideo(e) {
      const files = this.$refs.fileVideo
      const fileVideo = files.files[0]
      // if (this.validateImageUploads(fileImg)) return

      if (fileVideo.type.startsWith("video/")) {
        this.videoS3Upload()
      }
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
    async videoS3Upload() {
      const files = this.$refs.fileVideo
      const fileVideo = files.files[0]
      const firestoreParams = {
        col: "videos",
        data: {
          name: fileVideo.name,
        },
      }
      const dbResponse = await this.$store.dispatch(
        "db/create",
        firestoreParams
      )
      const firestoreId = dbResponse.id

      const fileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(fileVideo)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })

      console.log(fileBase64)

      const fileData = fileBase64.replace(/^data:\w+\/\w+;base64,/, "")
      const fileName = `post/${firestoreId}`
      const params = {
        Bucket: process.env.S3_BUCKET_RAW_DATA,
        Key: fileName,
        ContentType: "video/mp4",
        Body: Buffer.from(fileData, "base64"),
        ACL: "public-read",
        CacheControl: "no-cache, no-store",
      }
      const s3Url = `https://${process.env.S3_BUCKET_RAW_DATA}.s3.amazonaws.com/${fileName}`
      const s3ResponseUrl = await new Promise((resolve) => {
        s3.putObject(params, (err, data) => {
          if (err) {
            console.log("err")
            resolve(err)
          } else {
            console.log("success")
            resolve(s3Url)
          }
        })
      })

      console.log(s3ResponseUrl)

      firestoreParams.id = firestoreId
      firestoreParams.data.s3_url = s3ResponseUrl

      const dbUpdate = await this.$store.dispatch("db/update", firestoreParams)
      console.log(dbUpdate)
      // return s3ResponseUrl
    },
  },
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
