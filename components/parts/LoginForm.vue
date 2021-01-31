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
</template>

<script>
import firebase from "firebase"
import formModal from "~/components/modules/SlotFormModal"

export default {
  components: {
    formModal
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
          const teamsUsers = await this.$store.dispatch("fsWhere", whereValue)
          if(teamsUsers.length === 0) return this.$router.push("/teams/register")

          const teamIds = teamsUsers.map(_team_user => _team_user.teamId)
          const teamPromises = teamIds.map(_teamId => {
            return new Promise((resolve, reject) => {
              this.$store.dispatch("fsFind", {
                collectionName: "teams",
                documentId: _teamId
              }).then(value => {
                resolve(value)
              }).catch(e => {
                console.log(e)
              })
            })
          })
          const teams = await Promise.all(teamPromises).then(value => value)

          if(this.$route.query.team) {
            const teamSlug = this.$route.query.team
            const teamSlugValue = {
              collectionName: "teams",
              key: "slug",
              value: teamSlug
            }
            const registerdTeams = await this.$store.dispatch("fsWhere", teamSlugValue)

            if (registerdTeams.length >= 1 && !teamIds.includes(registerdTeams[0].documentId)) {
              const teamsUsersAdd = {
                collectionName: "teamsUsers",
                data: {
                  teamId: registerdTeams[0].documentId,
                  userId: user.documentId
                }
              }
              const data = await this.$store.dispatch("fsAdd", teamsUsersAdd)
              console.log(data)
            }
          }

          // 既にチームをフォローしていた場合、チーム詳細にリダイレクト
          if (teams.length >= 1) {
            await this.$store.dispatch("setTeamInfo", {
              teamInfo: teams[0]
            })
            this.$router.push(`/teams/${teams[0].slug}`)
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
