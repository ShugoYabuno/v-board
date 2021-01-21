<template>
  <div class="flex-i-center w-full h-full">
    <TeamIcon :img-src="teamInfo.iconImageUrl" />
    <p
      v-if="teamInfo"
      class="ml-2 text-primary-100">
      {{ teamInfo.name }}
    </p>
  </div>
</template>

<script>
import TeamIcon from "~/components/modules/TeamIcon"

export default {
  components: {
    TeamIcon
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
