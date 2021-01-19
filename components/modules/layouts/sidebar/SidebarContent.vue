<template>
  <div>
    <div class="flex-i-center h-14 px-2 hover:bg-primary-10">
      <div class="w-9 h-9 rounded-full overflow-hidden">
        <img
          v-if="teamInfo && teamInfo.iconImageUrl"
          :src="`${teamInfo.iconImageUrl}`"
          class="object-cover"
          alt="ユーザーアイコン">
        <div class="h-full w-full flex-ij-center bg-gray-60">
          <font-awesome-icon
            icon="users"
            class="bg-gray-60" />
        </div>
      </div>
      <p
        v-if="teamInfo"
        class="ml-2">
        {{ teamInfo.name }}
      </p>
    </div>
    <nuxt-link
      :to="`/teams/${teamInfo.slug}/config`"
      class="flex-i-center h-8 px-2 text-gray-80 hover:bg-primary-10">
      <font-awesome-icon
        icon="cog"
        class="" />
      <p class="text-sm ml-1">
        チーム設定
      </p>
    </nuxt-link>
    <VideoUploader class="mt-4" />
  </div>
</template>

<script>
import VideoUploader from "~/components/parts/VideoUploader"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUsers, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faUsers)
library.add(faCog)

export default {
  components: {
    VideoUploader,
    FontAwesomeIcon,
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
