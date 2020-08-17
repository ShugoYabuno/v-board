<template>
  <div class="container">
    <h1>詳細</h1>
    <input @change="changeFile" ref="rfafile" type="file" />
    <input @click="regist" type="button" value="Upload" />
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      restaurants: [],
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
  },
  methods: {
    changeFile(e) {
      const files = e.target.files || e.dataTransfer.files
      // ファイルが選択されたら変数に入れる
      this.uploadfile = files[0]
    },
    // 送信アクション
    async regist() {
      // パラメータ生成
      var params = new FormData()
      // FormDataにアップロードするファイルを設定
      params.append("file", this.uploadfile)
      // API実行
      const { data } = await axios.post(
        "/" + process.env.API_PATH + "/hoge/fileUpload",
        params,
        {
          headers: {
            // multipartで送信
            "content-type": "multipart/form-data",
          },
        }
      )
      console.log(data)
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
