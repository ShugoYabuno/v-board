<template>
  <div class="flex-i-center w-full h-full">
    <div class="w-9 h-9 rounded-full overflow-hidden">
      <CircleImg
        v-if="teamInfo.iconImageUrl"
        :img-src="teamInfo.iconImageUrl"
        alt="ユーザーアイコン" />
      <div
        v-else
        class="h-full w-full flex-ij-center bg-gray-60">
        <font-awesome-icon
          icon="users"
          class="bg-gray-60" />
      </div>
    </div>
    <p
      v-if="teamInfo"
      class="ml-2 text-primary-100">
      {{ teamInfo.name }}
    </p>
  </div>
</template>

<script>
import CircleImg from "~/components/parts/CircleImg"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faUsers)

export default {
  components: {
    FontAwesomeIcon,
    CircleImg
  },
  data() {
    return {
      teamInfo: {},
    }
  },
  computed: {
    gettersTeamInfo() {
      return this.$store.getters["teamInfo"]
    }
  },
  watch: {
    updateTeamInfo(_value) {
      this.setThisVariables(_value)
    }
  },
  async mounted() {
    const teamInfo = this.$store.getters["teamInfo"]
    this.setThisVariables(teamInfo)
  },
  methods: {
    setThisVariables(_teanInfo) {
      const {
        iconImageUrl,
        name
      } = _teanInfo

      this.teamInfo = {
        iconImageUrl,
        name
      }
    }
  }
}
</script>
