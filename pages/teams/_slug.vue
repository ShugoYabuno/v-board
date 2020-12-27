<template>
  <div class="wrapper bg-gray-40">
    <p
      v-if="teamInfo && teamInfo.data"
      class="pt-2 ml-4 mb-2">
      チーム名: {{ teamInfo.data.name }}
    </p>
    <div class="ml-4">
      <VideoUploader :get-videos="getVideos" />
    </div>
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
import VideoUploader from "~/components/Atoms/VideoUploader"

export default {
  components: {
    VideoPlayer,
    VideoUploader
  },
  layout: "user",
  data() {
    return {
      teamInfo: {},
      videos: [],
      videoInput: "",
      isLoaded: false,
      // videoOptions: {
      //   autoplay: true,
      //   controls: true,
      //   sources: [
      //     {
      //       src:
      //         "https://video-share-raw-data.s3.amazonaws.com/post/Lh5NGl7Msc6HucgbQ45x",
      //       type: "video/mp4",
      //     },
      //   ],
      // },
      // videoOptions2: {
      //   autoplay: true,
      //   controls: true,
      //   sources: [
      //     {
      //       src:
      //         "https://video-share-raw-data.s3.amazonaws.com/post/Lh5NGl7Msc6HucgbQ45x",
      //       type: "video/mp4",
      //     },
      //   ],
      // },
    }
  },
  async mounted() {
    const resFindTeam = await this.$store.dispatch("findTeamBySlug", {
      slug: this.$route.params.slug
    })
    if(!resFindTeam) return

    this.teamInfo = resFindTeam[0]

    await this.getVideos()
  },
  methods: {
    convertVideoOptions(_video) {
      return {
        sources: [
          {
            src: _video.data.storageUrl,
            type: _video.data.contentType,
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
