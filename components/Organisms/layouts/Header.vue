<template>
  <v-app-bar
    absolute
    color="primary"
    dense
    :collapse="!collapseOnScroll"
    :collapse-on-scroll="collapseOnScroll"
    scroll-target="#scrolling"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-btn color="primary" depressed nuxt to="/" class="header_title"
      >Video Share</v-btn
    >

    <v-spacer></v-spacer>

    <v-btn icon nuxt to="/sign_in">
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <template v-slot:extension>
      <v-tabs align-with-title color="accent" v-model="selectTab">
        <v-tab>My Videos</v-tab>
        <v-tab>Team Videos</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
// import firebase from "firebase"

export default {
  // asyncData() {
  //   return {
  //     isAuth: false,
  //   }
  // },
  data() {
    return {
      collapseOnScroll: true,
      selectTab: 0,
    }
  },
  methods: {},
  // mounted() {
  //   firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  //   console.log(this.isAuth)
  // },
}
</script>

<style lang="scss">
header {
  height: 5rem !important;
  .v-toolbar__content {
    height: 2.5rem !important;
  }

  .v-tabs {
    .v-slide-group__wrapper {
      height: 2.5rem !important;
    }
  }

  &.v-app-bar--is-scrolled {
    height: 3rem !important;

    .header_title {
      display: none;
    }
  }
}
</style>
