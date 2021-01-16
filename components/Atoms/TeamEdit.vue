<template>
  <div>
    <div>
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
      type="
        button"
      class="block mx-auto mt-4 px-7 py-3 text-xl rounded-xl bg-blue text-gray-10"
      @click="onSubmit()">
      登録
    </button>
  </div>
</template>

<script>
const teamsModel = {
  slug: "",
  name: ""
}

export default {
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
      }
    }
  },
  async mounted() {
    this.teamInfo = this.$store.getters["teamInfo"]
    console.log(this.teamInfo)
  },
  methods: {
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
