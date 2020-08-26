<template>
  <v-app>
    <Header />
    <v-sheet
      id="scrolling"
      class="overflow-y-auto"
      max-height="100vh"
      min-height="100vh"
    >
      <v-container style="height: 1000px;">
        <nuxt />
      </v-container>
    </v-sheet>
  </v-app>
</template>

<script>
import Header from "~/components/Organisms/layouts/Header"

export default {
  components: {
    Header,
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: calc(200vh - 5rem);
  margin-top: 5rem;
}
</style>
