<template>
  <formModal>
    <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
      Vboardにログイン
    </h2>
    <button
      class="flex-ij-center p-4 h-14 w-full border-1-solid border-gray-50 rounded hover:bg-gray-30 transition"
      @click="signIn">
      <img
        src="/images/icons/google.png"
        alt="Googleロゴ"
        class="h-5 w-5 mr-4">
      <p class="text-gray-60 text-center">
        Googleアカウントでログイン
      </p>
    </button>
  </formModal>
  <!-- <div class="w-96 bg-gray-10 p-8 rounded-lg shadow-xl"> -->
  <!-- </div> -->
</template>

<script>
import firebase from "firebase"
import formModal from "~/components/SlotFormModal"

export default {
  // asyncData() {
  //   return {
  //     isAuth: false,ik¥
  //   }
  // },
  components: {
    formModal
  },
  mounted() {
    // firebase.auth().onAuthStateChanged((user) => (this.isAuth = !!user))
    // // console.log(this.isAuth)
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async (result) => {
          // const googleAccessToken = result.credential.accessToken
          const {
            displayName,
            email,
            photoURL,
            // emailVerified,
            uid,
          } = result.user
          const userInfo = {
            display_name: displayName,
            email,
            photo_url: photoURL,
            // emailVerified,
            google_uid: uid,
          }
          await this.$store.dispatch("completeGoogleAuth", { userInfo })
          await this.$store.dispatch("logIn")
          this.$router.push("/teams")
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
