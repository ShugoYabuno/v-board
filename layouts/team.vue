<template>
  <div id="wrapper">
    <Header />
    <div class="bottom-wrapper">
      <div class="left-box">
        <Sidebar />
      </div>
      <div class="right-box">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Organisms/layouts/Header"
import Sidebar from "~/components/Organisms/layouts/Sidebar"

export default {
  components: {
    Header,
    Sidebar,
  },
  async asyncData({ route, store }) {
    const teamId = route.params.team_id
    return {
      teamId,
    }
  },
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100vw;
  height: 100vh;
  .bottom-wrapper {
    @include flex();
    height: calc(100% - 2.5rem);
    padding-top: 2.5rem;
    color: #fff;
    .left-box {
      width: 15%;
      height: 100%;
      background: $sidebar-color;
      border-right: 1px solid $border-color;
    }
    .right-box {
      width: 85%;
      background: $black;
    }
  }
}
</style>
