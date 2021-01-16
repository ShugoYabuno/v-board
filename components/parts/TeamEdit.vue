<template>
  <div>
    <label
      for="teamIconUploader"
      class="block text-center text-sm mx-auto text-gray-70">
      チームアイコン</label>
    <div class="flex-ij-center w-24 h-24 mx-auto mt-2 overflow-hidden rounded-full border-1-solid border-gray-40 bg-gray-10">
      <img
        v-if="teamInfo.iconImageUrl"
        id="icon"
        :src="`${teamInfo.iconImageUrl}`"
        class="object-cover"
        alt="チームアイコン">
      <label
        for="teamIconUploader"
        class="absolute p-3 rounded-full hover:bg-gray-100 hover:bg-opacity-20">
        <FontAwesomeIcon
          icon="camera"
          class="fa-lg text-primary text-opacity-90" />
      </label>
      <input
        id="teamIconUploader"
        ref="teamIcon"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleChangeImage">
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
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faCamera)

const teamsModel = {
  iconImageUrl: "",
  slug: "",
  name: ""
}

export default {
  components: {
    FontAwesomeIcon
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
    this.teamInfo = this.$store.getters["teamInfo"]
  },
  methods: {
    async handleChangeImage() {
      this.onUpload = true
      const files = this.$refs.teamIcon
      const fileImage = files.files[0]

      const resUpload = await this.$store.dispatch("image/upload", {
        fileImage,
      })

      this.teamInfo.iconImageUrl = resUpload
      this.onUpload = false
    },
    async onSubmit() {
      if(this.isError()) return

      const { teamInfo } = this
      const { documentId } = teamInfo

      let resEditTeam = {}
      if (this.isCreate) {
        const resAddTeam = await this.$store.dispatch("addTeam", { teamInfo })
        if(!resAddTeam) return

        resEditTeam = resAddTeam
      } else {
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
    }
  },
}
</script>
