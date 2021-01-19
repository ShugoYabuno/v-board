<template>
  <div class="flex-ij-center h-full p-20 bg-gray-10">
    <div class="w-96 bg-secondary-20 p-8 rounded-lg shadow-xl">
      <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
        ユーザー情報の編集
      </h2>
      <div>
        <label
          for="teamIconUploader"
          class="block text-center text-sm mx-auto text-gray-70">
          ユーザーアイコン</label>
        <div class="w-24 h-24 mx-auto mt-2">
          <IconUploader
            v-if="userInfo.photoURL"
            :icon-type="'userIcons'"
            :icon-image-url="userInfo.photoURL"
            :switch-on-upload="switchOnUpload" />
        </div>
        <div class="mt-4">
          <label
            for="name"
            class="text-gray-70 text-sm">
            ユーザー名</label>
          <input
            id="name"
            v-model="userInfo.displayName"
            type="text"
            class="form-control w-full"
            placeholder="ユーザー名">
          <label
            v-if="error.displayName"
            class="text-darkbrown"
            for="name">
            ※{{ error.displayName }}
          </label>
        </div>
        <button
          type="button"
          :disabled="onUpload"
          class="block mx-auto mt-4 px-7 py-3 text-xl rounded-xl bg-blue text-gray-10"
          @click="onSubmit()">
          登録
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconUploader from "~/components/parts/IconUploader"

const usersModel = {
  photoURL: "",
  displayName: ""
}

export default {
  components: {
    IconUploader
  },
  layout: "user",
  data() {
    return {
      onUpload: false,
      error: {
        ...usersModel
      },
      userInfo: {
        ...usersModel
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("initial")
    const userInfo = this.$store.getters["userInfo"]

    const {
      iconImageUrl,
      displayName
    } = userInfo

    this.userInfo = {
      iconImageUrl,
      displayName
    }

    console.log(this.userInfo)
  },
  methods: {
    async onSubmit() {
      if(this.isError()) return

      const { teamInfo } = this

      let resEditTeam = {}
      if (this.isCreate) {
        const resAddTeam = await this.$store.dispatch("addTeam", { teamInfo })
        if(!resAddTeam) return

        const userInfo = this.$store.getters["userInfo"]
        const followTeamIds = [...userInfo.followTeamIds, resAddTeam.data.documentId]

        const payload = {
          collectionName: "users",
          documentId: userInfo.documentId,
          data: {
            followTeamIds
          }
        }
        await this.$store.dispatch("fsUpdate", payload)

        resEditTeam = resAddTeam
      } else {
        const { documentId } = teamInfo
        delete teamInfo.documentId

        const resUpdateTeam = await this.$store.dispatch("updateTeam", {
          documentId,
          teamInfo
        })
        if(!resUpdateTeam) return

        resEditTeam = resUpdateTeam
      }

      if(resEditTeam.status === "error" && resEditTeam.message === "Slug is exist") {
          this.error.slug = "そのチームIDは既に存在します。別のIDを試してください。"
          return
      } else if (resEditTeam.status !== "success") return

      this.$router.push(`/teams/${resEditTeam.data.slug}`)
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
    },
    switchOnUpload(_onUpload) {
      this.onUpload = _onUpload
    }
  },
}
</script>
