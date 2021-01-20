<template>
  <div
    class="flex-ij-center w-full h-full overflow-hidden rounded-full border-1-solid bg-gray-20 border-gray-50">
    <img
      v-if="imgSrc"
      id="icon"
      :src="`${imgSrc}`"
      class="object-cover"
      alt="チームアイコン">
    <label
      for="teamIconUploader"
      class="absolute p-3 rounded-full hover:bg-gray-100 hover:bg-opacity-20">
      <FontAwesomeIcon
        icon="camera"
        class="fa-lg text-primary text-opacity-90" />
    </label>
    <input
      id="teamIconUploader"
      ref="teamIcon"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleChangeImage">
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faCamera)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    iconType: {
      type: String,
      required: true
    },
    iconImageUrl: {
      type: String,
      default: ""
    },
    switchOnUpload: {
      type: Function,
      required: true
    },
    insertImageUrl: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      imgSrc: "",
    }
  },
  async mounted() {
    this.imgSrc = this.iconImageUrl
  },
  methods: {
    async handleChangeImage() {
      this.switchOnUpload(true)
      const files = this.$refs.teamIcon
      const fileImage = files.files[0]

      let action = "teamIconUpload"
      if (this.iconType === "userIcons") action = "userIconUpload"

      const resUpload = await this.$store.dispatch(`image/${action}`, {
        fileImage,
      })

      this.imgSrc = resUpload
      this.insertImageUrl(resUpload)
      this.switchOnUpload(false)
    },
  }
}
</script>
