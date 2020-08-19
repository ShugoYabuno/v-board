<template>
  <div class="container">
    <div class="links">
      <a @click="signIn" class="button--green">signIn</a>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  asyncData() {
    return {
      isAuth: false,
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
  },
  methods: {
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
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
