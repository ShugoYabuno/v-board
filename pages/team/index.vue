<template>
  <div class="container">
    <ul class="list-group">
      <template v-for="(_team, _index) in teams">
        <li :key="_index" class="list-group-item">
          <nuxt-link :to="`/team/${_team._id}`">
            {{ _team.name }}
          </nuxt-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [],
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('db/get', 'teams')
    this.teams = response
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
}
</style>
