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

    <v-toolbar-title>Video Share</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <template v-slot:extension>
      <v-tabs align-with-title color="accent">
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
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
    }
  },
  // mounted() {
  //   firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  //   console.log(this.isAuth)
  // },
}
</script>

<style lang="scss" scoped>
// .header {
//   position: fixed;
//   top: 0;
//   width: 100vw;
//   height: 5rem;
//   color: #fff;
//   background: $header-color;
//   box-shadow: 0 0 7px 0 #777;
// }
</style>
