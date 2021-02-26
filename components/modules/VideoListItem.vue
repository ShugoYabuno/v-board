<template>
  <div class="relative w-full h-full">
    <VideoPlayer
      v-if="video"
      :options="options" />
    <nuxt-link
      :to="`/teams/${teamSlug}/videos/${video.documentId}`"
      class="absolute inset-0 block w-full h-full" />
  </div>
</template>

<script>
import VideoPlayer from "~/components/parts/VideoPlayer"

export default {
  components: {
    VideoPlayer,
  },
  props: {
    teamSlug: {
      type: String,
      required: true
    },
    video: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
}
</script>
