<template>
  <div class="flex bg-gray-20 w-full h-full">
    <VideoPlayer
      v-if="video"
      class="flex-grow"
      :options="convertVideoOptions(video)" />
    <div class="w-80">
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
      <p>コメント</p>
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
  async asyncData({store, params}) {
    const video = await store.dispatch("fsFind", {
      collectionName: "videos",
      documentId: params.videoId
    })

    return {
      video
    }
  },
  methods: {
    convertVideoOptions(_video) {
      return {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: _video.storageUrl,
            type: _video.contentType,
          },
        ]
      }
    },
  }
}
</script>
