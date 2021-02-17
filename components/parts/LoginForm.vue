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
          const followTeamIds = teamsUsers.map(_team_user => _team_user.teamId)
          const teamPromises = followTeamIds.map(_teamId => {
            return new Promise((resolve, reject) => {
              this.$store.dispatch("fsFind", {
                collectionName: "teams",
                documentId: _teamId
              }).then(value => {
                resolve(value)
              }).catch(e => {
                console.log(e)
                reject(null)
              })
            })
          })
          const teams = await Promise.all(teamPromises).then(values => {
            return values.filter(_value => _value && _value !== null)
          })

          if(this.$route.query.team) {
            console.log(this.$route.query.team)
            const teamSlug = this.$route.query.team
            const teamSlugValue = {
              collectionName: "teams",
              key: "slug",
              value: teamSlug
            }
            const registerdTeams = await this.$store.dispatch("fsWhere", teamSlugValue)

            console.log(registerdTeams)

            if (registerdTeams.length >= 1 && !followTeamIds.includes(registerdTeams[0].documentId)) {
              const teamsUsersAdd = {
                collectionName: "teamsUsers",
                data: {
                  teamId: registerdTeams[0].documentId,
                  userId: user.documentId
                }
              }
              await this.$store.dispatch("fsAdd", teamsUsersAdd)
              this.$router.push(`/teams/${registerdTeams[0].slug}`)
              return
            }
          }

          if (teams && teams.length >= 1) {
            // 既にチームをフォローしていた場合、チーム詳細にリダイレクト
            await this.$store.dispatch("setTeamInfo", {
              teamInfo: teams[0]
            })
            this.$router.push(`/teams/${teams[0].slug}`)
          } else {
            // チームが存在しない場合はチーム登録から
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
