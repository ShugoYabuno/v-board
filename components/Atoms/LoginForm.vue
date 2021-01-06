<template>
  <formModal>
    <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
      Vboardにログイン
    </h2>
    <button
      class="flex-ij-center p-4 h-14 w-full border-1-solid border-gray-50 rounded hover:bg-gray-30 transition"
      @click="logIn">
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
  components: {
    formModal
  },
  data() {
    return {
      teamId: ""
    }
  },
  mounted() {
    this.teamId = this.$route.query.teamid
  },
  methods: {
    logIn() {
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
            displayName,
            email,
            photoURL,
            // emailVerified,
            googleUid: uid,
            followTeamIds: []
          }
          if(this.teamId) userInfo.followTeamIds.push(this.teamId)

          await this.$store.dispatch("setUserInfo", { userInfo })
          await this.$store.dispatch("logIn")

          const storeUserInfo = this.$store.getters["userInfo"]
          const teamIds = storeUserInfo.followTeamIds
          if (teamIds && teamIds[0]) {
            const team = await this.$store.dispatch("firestoreFind", {
              collectionName: "teams",
              documentId: teamIds[0]
            })

            // 既にチームをフォローしていた場合、チーム詳細にリダイレクト
            if (team) {
              this.$router.push(`/teams/${team.slug}`)
            } else {
              this.$router.push("/teams/register")
            }
          } else {
            this.$router.push("/teams/register")
          }
        })
        .catch((error) => {
          console.log("エラーが発生しました")
          console.log(error)
        })
    },
  },
}
</script>
