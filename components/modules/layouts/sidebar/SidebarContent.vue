<template>
  <div>
    <div class="h-14 px-2">
      <TeamInfo />
    </div>
    <nuxt-link
      :to="`/teams/${teamInfo.slug}/config`"
      class="flex-i-center h-8 px-2 text-gray-80 hover:bg-primary-10">
      <IconCog />
      <p class="text-sm ml-1">
        チーム設定
      </p>
    </nuxt-link>
    <VideoUploader class="mt-4" />
  </div>
</template>

<script>
import TeamInfo from "~/components/modules/TeamInfo"
import VideoUploader from "~/components/parts/VideoUploader"
import IconCog from "~/components/parts/fontawesome/Cog"

export default {
  components: {
    VideoUploader,
    IconCog,
    TeamInfo
  },
  data() {
    return {
      teamInfo: {},
      profileIcon: "",
      teamSlug: "/"
    }
  },
  async mounted() {
    this.teamInfo = this.$store.getters["teamInfo"]
    if (this.teamInfo.slug) this.teamSlug = `/${this.teamInfo.slug}`
  }
}
</script>
