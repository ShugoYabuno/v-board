<template>
  <div class="video-wrapper">
    <div class="video-content">
      <video
        ref="videoPlayer"
        class="video-js vjs-big-play-centered" />
    </div>
  </div>
</template>

<script>
import videojs from "video.js"
import "video.js/dist/video-js.css"

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    console.log(this.options)
    this.player = videojs(
      this.$refs.videoPlayer,
      {
        ...this.options,
        aspectRatio: "16:9",
        // autoplay: true,
        controls: true,
      },
      function onPlayerReady() {
        console.log("onPlayerReady", this)
      }
    )
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<style lang="css">
.video-js .vjs-big-play-button {
  @apply bg-primary-100 bg-opacity-30 border-primary-100 text-secondary-100 opacity-30;
}

.video-js:hover .vjs-big-play-button,
.video-js .vjs-big-play-button:focus {
  @apply bg-primary-100 bg-opacity-30 border-primary-100 text-secondary-100 opacity-40 text-opacity-100;
}
</style>
