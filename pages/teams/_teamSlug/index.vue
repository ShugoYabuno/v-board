<template>
  <div class="bg-gray-10 h-full">
    <div class="ml-4" />
    <div
      v-if="isLoaded && videos.length >= 1"
      class="flex flex-wrap">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="w-3/12 p-4">
        <VideoPlayer
          v-if="video"
          :options="convertVideoOptions(video)" />
      </div>
    </div>
    <div v-if="isLoaded && videos.length === 0">
      <p class="ml-4 pt-4">
        動画がアップロードされていません。
      </p>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "~/components/parts/VideoPlayer"

export default {
  components: {
    VideoPlayer,
  },
  layout: "user",
  data() {
    return {
      teamInfo: {},
      videos: [],
      videoInput: "",
      isLoaded: false,
    }
  },
  async fetch({store, params}) {
    await store.dispatch("setTeamInfoBySlug", {
      teamSlug: params.teamSlug
    })
  },
  computed: {
    sentryVideoUpload: function() {
      return this.$store.getters["sentryVideoUpload"]
    }
  },
  watch: {
    sentryVideoUpload() {
      this.getVideos()
    }
  },
  async mounted() {
    // await this.$store.dispatch("setTeamInfoBySlug", {
    //   teamSlug: this.$route.params.teamSlug
    // })
    await this.getVideos()
  },
  methods: {
    convertVideoOptions(_video) {
      return {
        sources: [
          {
            src: _video.storageUrl,
            type: _video.contentType,
            controls: true,
          },
        ]
      }
    },
    async getVideos() {
      this.isLoaded = false

      const teamInfo = await this.$store.getters["teamInfo"]
      const videos = await this.$store.dispatch("video/getByTeam", {
        teamId: teamInfo.documentId
      })

      this.videos = videos
      this.isLoaded = true
    }
  }
}
</script>
