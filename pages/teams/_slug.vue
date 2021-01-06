<template>
  <div class="wrapper bg-gray-10">
    <p
      v-if="teamInfo"
      class="pt-2 ml-4 mb-2">
      チーム名: {{ teamInfo.name }}
    </p>
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
      <p>動画がアップロードされていません。</p>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "~/components/Atoms/VideoPlayer"

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
  async mounted() {
    const resFindTeam = await this.$store.dispatch("findTeamBySlug", {
      slug: this.$route.params.slug
    })
    console.log(resFindTeam)
    if(!resFindTeam) return

    this.teamInfo = resFindTeam[0]

    await this.getVideos()
  },
  methods: {
    convertVideoOptions(_video) {
      return {
        sources: [
          {
            src: _video.storageUrl,
            type: _video.contentType,
          },
        ]
      }
    },
    async getVideos() {
      this.isLoaded = false

      const videos = await this.$store.dispatch("video/getByTeam")

      this.videos = videos
      this.isLoaded = true
    }
  },
}
</script>
