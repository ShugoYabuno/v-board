<template>
  <div>
    <label
      for="teamIconUploader"
      class="block text-center text-sm mx-auto text-gray-70">
      チームアイコン</label>
    <div class="w-24 h-24 mx-auto mt-2">
      <IconUploader
        v-if="teamInfo.iconImageUrl"
        :icon-type="'teamIcons'"
        :icon-image-url="teamInfo.iconImageUrl"
        :switch-on-upload="switchOnUpload"
        :set-image-url="setImageUrl" />
    </div>
    <div class="mt-4">
      <label
        v-if="isCreate"
        for="slug"
        class="text-gray-70 text-sm pl-2">
        ※半角英小文字と_.-のみ有効です</label>
      <label
        v-else
        for="slug"
        class="text-gray-70 text-sm">
        チームID ※編集できません</label>
      <input
        v-if="isCreate"
        id="slug"
        v-model="teamInfo.slug"
        type="text"
        class="form-control w-full"
        placeholder="チームID">
      <input
        v-else
        id="slug"
        v-model="teamInfo.slug"
        type="text"
        class="form-control focus w-full"
        readonly
        placeholder="チームID">
      <label
        v-if="error.slug"
        class="text-darkbrown"
        for="slug">
        ※{{ error.slug }}
      </label>
    </div>
    <div class="mt-4">
      <label
        v-if="!isCreate"
        for="name"
        class="text-gray-70 text-sm">
        チーム名</label>
      <input
        id="name"
        v-model="teamInfo.name"
        type="text"
        class="form-control w-full"
        placeholder="チーム名">
      <label
        v-if="error.name"
        class="text-darkbrown"
        for="name">
        ※{{ error.name }}
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
</template>

<script>
import IconUploader from "~/components/parts/IconUploader"

const teamsModel = {
  iconImageUrl: "",
  slug: "",
  name: ""
}

export default {
  components: {
    IconUploader
  },
  layout: "user",
  props: {
    isCreate: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      error: {
        ...teamsModel
      },
      teamInfo: {
        ...teamsModel
      },
      onUpload: false
    }
  },
  async mounted() {
    const teamInfo = await this.$store.getters["teamInfo"]
    if (teamInfo) {
      this.teamInfo = {
        ...this.teamInfo,
        ...teamInfo
      }
    }
  },
  methods: {
    async onSubmit() {
      if(this.isError()) return

      const { teamInfo } = this

      let resEditTeam = {}
      if (this.isCreate) {
        const resAddTeam = await this.$store.dispatch("addTeam", { teamInfo })
        if(this.responseErrorCheck(resAddTeam)) return

        const userInfo = this.$store.getters["userInfo"]

        const addValue = {
          collectionName: "teamsUsers",
          data: {
            teamId: resAddTeam.data.documentId,
            userId: userInfo.documentId
          }
        }

        await this.$store.dispatch("fsAdd", addValue)

        this.$router.push(`/teams/${resAddTeam.data.slug}`)
      } else {
        const { documentId } = teamInfo
        delete teamInfo.documentId

        const resUpdateTeam = await this.$store.dispatch("updateTeam", {
          documentId,
          teamInfo
        })
        if (this.responseErrorCheck(resUpdateTeam)) return

        this.$store.dispatch("setTeamInfo", resUpdateTeam.data)
        this.$router.push(`/teams/${resUpdateTeam.data.slug}`)
      }

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
    },
    setImageUrl(_url) {
      this.teamInfo.iconImageUrl = _url
    },
    responseErrorCheck(_res) {
      if(_res.status === "error" && _res.message === "Slug is exist") {
        this.error.slug = "そのチームIDは既に存在します。別のIDを試してください。"
        return true
      } else if (_res.status !== "success") return true

      return false
    }
  },
}
</script>
