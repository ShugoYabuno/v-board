<template>
  <formModal>
    <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
      Vboardにログイン
    </h2>
    <button
      class="flex-ij-center p-4 h-14 w-full border-1-solid border-gray-50 rounded hover:bg-gray-30 transition"
      @click="logIn">
      <img
        src="~/assets/images/google.png"
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
import formModal from "~/components/modules/SlotFormModal"

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
            iconImageUrl: photoURL,
            // emailVerified,
            googleUid: uid
          }

          await this.$store.dispatch("logIn")
          const user = await this.$store.dispatch("setUserInfo", { userInfo })
          const whereValue = {
            collectionName: "teamsUsers",
            key: "userId",
            value: user.documentId
          }
          const followTeamIds = await this.$store.dispatch("fsWhere", whereValue)
          if(followTeamIds.length === 0) this.$router.push("/teams/register")

          const team = await this.$store.dispatch("fsFind", {
            collectionName: "teams",
            documentId: followTeamIds[0].teamId
          })

          // 既にチームをフォローしていた場合、チーム詳細にリダイレクト
          if (team) {
            await this.$store.dispatch("setTeamInfo", {
              teamInfo: team
            })
            this.$router.push(`/teams/${team.slug}`)
          // チームが存在しない場合はチーム登録から
          } else {
            this.$router.push("/teams/register")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
