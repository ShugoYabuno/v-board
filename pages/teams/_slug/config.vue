<template>
  <div class="flex-ij-center h-full p-20 bg-gray-10">
    <div class="w-96 bg-primary-20 p-8 rounded-lg shadow-xl">
      <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
        チーム情報の編集
      </h2>
      <TeamEdit :is-create="false" />
    </div>
  </div>
</template>

<script>
import TeamEdit from "~/components/Atoms/TeamEdit"
const teamsModel = {
  slug: "",
  name: ""
}

export default {
  components: {
    TeamEdit
  },
  layout: "user",
  data() {
    return {
      error: {
        ...teamsModel
      },
      teamInfo: {
        ...teamsModel
      }
    }
  },
  methods: {
    async onSubmit() {
      if(this.isError()) return

      const { teamInfo } = this

      const resAddTeam = await this.$store.dispatch("addTeam", { teamInfo })
      if(!resAddTeam) return

      if(resAddTeam.status === "error" && resAddTeam.message === "Slug is exist") {
          this.error.slug = "そのチームIDは既に存在します。別のIDを試してください。"
          return
      } else if (resAddTeam.status !== "success") return

      const storeUserInfo = await this.$store.getters["userInfo"]

      let followTeamIds = []
      if (storeUserInfo.followTeamIds) followTeamIds = [...storeUserInfo.followTeamIds]

      followTeamIds.push(resAddTeam.data.documentId)

      const updateData = {
        collectionName: "users",
        documentId: storeUserInfo.documentId,
        data: {
          followTeamIds
        }
      }

      console.log(resAddTeam)

      const resUpdateUser = await this.$store.dispatch("update", updateData)
      this.$router.push(`/teams/${resAddTeam.data.slug}`)
    },
    isError() {
      if(!/^[a-z0-9_.-]+$/.test(this.teamInfo.slug)) {
        this.error.slug = "半角英小文字、ピリオド(.)、アンダースコア(_)、ハイフン(-)のみ使用可能です"
        return true
      } else if(!this.teamInfo.slug) {
        this.error.slug = "入力してください"
        return true
      } else {
        this.error.slug = ""
      }

      if(this.teamInfo.name.length > 30) {
        this.error.name = "チーム名は50文字以内で入力してください"
        return true
      } else if (!this.teamInfo.name) {
        this.error.name = "入力してください"
        return true
      } else {
        this.error.name = ""
      }

      return false
    }
  }
}
</script>
