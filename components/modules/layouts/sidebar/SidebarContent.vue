<template>
  <div>
    <div class="h-14 px-2">
      <TeamInfo />
    </div>
    <button
      v-clipboard:copy="shareLink"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="flex-i-center w-full h-8 px-2 text-gray-80 hover:bg-primary-10">
      <FontAwesomeIcon
        icon="link" />
      <p class="text-sm ml-1">
        {{ shareMessage }}
      </p>
    </button>
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
import { library } from "@fortawesome/fontawesome-svg-core"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Vue from "vue"
import VueClipboard from "vue-clipboard2"

Vue.use(VueClipboard)

library.add(faLink)

export default {
  components: {
    VideoUploader,
    IconCog,
    TeamInfo,
    FontAwesomeIcon
  },
  data() {
    return {
      teamInfo: {},
      profileIcon: "",
      teamSlug: "/",
      shareLink: "",
      shareButtonMessage: "招待URLをコピー"
    }
  },
  computed: {
    shareMessage() {
      return this.shareButtonMessage
    }
  },
  async mounted() {
    this.shareLink = `${location.origin}/sign_in?team=${this.$route.params.teamSlug}&openExternalBrowser=1`
    this.teamInfo = await this.$store.getters["teamInfo"]
    if (this.teamInfo.slug) this.teamSlug = `/${this.teamInfo.slug}`
  },
  methods: {
    onCopy(e) {
      const defaultMessage = this.shareButtonMessage
      this.shareButtonMessage = "コピーしました!"
      setTimeout(() => {
        this.shareButtonMessage = defaultMessage
      }, 2000)
    },
    onError(e) {
      alert("Failed to copy texts")
    }
  }
}
</script>
