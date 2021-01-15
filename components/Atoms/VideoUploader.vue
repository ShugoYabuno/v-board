<template>
  <div>
    <label
      for="uploader"
      class="flex-ij-center w-10/12 rounded-full p-3 shadow bg-secondary text-white">
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
    <div
      v-if="uploadTasksProgress.length >= 1"
      class="fixed w-80 bottom-10 right-10 shadow-lg rounded-sm overflow-hidden z-10 bg-gray-30">
      <div class="bg-gray-100 text-gray-10 p-4">
        <p>Uploading {{ uploadTasksProgress.length }} items</p>
      </div>
      <div
        v-for="(task, index) in uploadTasksProgress"
        :key="index"
        class="p-2 border-solid border-t border-gray-50"
        :class="{ 'border-none': index == 0 }">
        <p>{{ task.fileName }}</p>
        <progress
          ref="progress"
          class="w-full h-2 bg-lightgreen"
          :value="`${task.progress}`"
          max="100" />
      </div>
    </div>
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
      uploadTasksProgress: []
    }
  },
  computed: {
    uploadTasks: function() {
      return this.$store.getters["video/uploadTasks"]
    }
  },
  watch: {
    uploadTasks(_val) {
      this.uploadTasksProgress = _val
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
