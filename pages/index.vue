<template>
  <div class="container">
    <!-- <ul class="list-group">
      <li
        v-for="(_team, _index) in restaurants"
        :key="_index"
        class="list-group-item"
      >
        <nuxt-link :to="`/restaurants/${_team._id}`">
          {{ _team.name }}
        </nuxt-link>
      </li>
    </ul> -->
    <h1>テスト</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
    }
  },
  async mounted() {
    const response = await this.$store.dispatch("db/get", "test")
    this.restaurants = response
    console.log(this.restaurants)
  },
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
