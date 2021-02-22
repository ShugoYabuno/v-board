<template>
  <div class="bg-gray-30 w-full h-full">
    <div class="ml-4" />
    <div
      v-if="videos.length >= 1"
      class="flex flex-wrap">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="relative w-full md:w-4/12 lg:w-3/12 p-4 hover:bg-secondary-10">
        <VideoPlayer
          v-if="video"
          :options="convertVideoOptions(video)" />
        <nuxt-link
          :to="`/teams/${teamSlug}/videos/${video.documentId}`"
          class="absolute inset-0 block w-full h-full" />
      </div>
    </div>
    <div
      v-if="videos.length === 0"
      class="ml-4">
      <p class="pt-4 text-gray">
        動画をアップロードしましょう
      </p>
      <img
        src="~/assets/images/upload.svg"
        alt="アップロード"
        class="w-96 h-96 mr-4">
    </div>
  </div>
</template>

<script>
import Meta from "~/utils/mixins/meta"
import VideoPlayer from "~/components/parts/VideoPlayer"

export default {
  components: {
    VideoPlayer,
  },
  mixins: [Meta],
  layout: "user",
  async asyncData({params, store}) {
    const teamInfo = await store.getters["teamInfo"]
    const videos = await store.dispatch("video/getByTeam", {
      teamId: teamInfo.documentId
    })

    return {
      teamSlug: params.teamSlug,
      videos
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
  // async mounted() {
  //   await this.getVideos()
  // },
  methods: {
    convertVideoOptions(_video) {
      return {
        sources: [
          {
            src: `${_video.storageUrl}#t=0.001`,
            type: _video.contentType,
          },
        ]
      }
    },
    async getVideos() {
      const teamInfo = await this.$store.getters["teamInfo"]

      const videos = await this.$store.dispatch("video/getByTeam", {
        teamId: teamInfo.documentId
      })

      this.videos = videos
    }
  }
}
</script>
