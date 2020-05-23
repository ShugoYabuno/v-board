<template>
  <div class="sidebar">
    <nuxt-link class="item" :to="`/team/${teamId}`">
      <p>{{ team.name }}</p>
    </nuxt-link>
    <nuxt-link
      class="item"
      v-for="(_project, _index) in projects"
      :key="_index"
      :to="`/team/${teamId}/${_project._id}`"
    >
      <p>{{ _project.name }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamId: '',
      team: {},
      projectId: '',
      projects: [],
    }
  },
  async mounted() {
    const { teamId } = this.$route.params

    const teamParas = {
      col1: 'teams',
      col1Id: teamId,
    }
    const team = await this.$store.dispatch('db/getColId', teamParas)

    const projectsParams = {
      col1: 'teams',
      col1Id: teamId,
      col2: 'projects',
    }
    const projects = await this.$store.dispatch('db/get2ColId', projectsParams)

    this.teamId = teamId
    this.team = team
    this.projects = projects
  },
}
</script>

<style lang="scss" scoped>
.item {
  @include flex();
  @include ai-center();
  height: 2.5rem;
  padding-left: 2rem;
  &:hover {
    background: #f8b862;
  }
  &.nuxt-link-active {
    background: #ea5506;
  }
}
</style>
