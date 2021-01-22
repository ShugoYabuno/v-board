<template>
  <div class="bg-gray-30 w-full h-full">
    <div class="ml-4" />
    <div
      v-if="isLoaded && videos.length >= 1"
      class="flex flex-wrap">
      <nuxt-link
        v-for="(video, index) in videos"
        :key="index"
        :to="`/teams/${teamSlug}/videos/${video.documentId}`"
        class="w-3/12 p-4 hover:bg-secondary-10">
        <VideoPlayer
          v-if="video"
          :options="convertVideoOptions(video)" />
      </nuxt-link>
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
  async asyncData({params}) {
    return {
      teamSlug: params.teamSlug
    }
  },
  data() {
    return {
      teamInfo: {},
      videos: [],
      videoInput: "",
      isLoaded: false,
    }
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
