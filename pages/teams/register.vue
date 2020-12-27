<template>
  <div class="flex-ij-center wrapper bg-gray-30">
    <formModal>
      <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
        チームの登録
      </h2>
      <label
        for="slug"
        class="text-gray-50 text-sm pl-2">※半角英小文字と_.-のみ有効です</label>
      <input
        id="slug"
        v-model="teamInfo.slug"
        type="text"
        class="form-control w-full"
        placeholder="チームID">
      <label
        v-if="error.slug"
        class="text-darkbrown"
        for="slug">
        ※{{ error.slug }}
      </label>
      <input
        id="name"
        v-model="teamInfo.name"
        type="text"
        class="form-control w-full mt-4"
        placeholder="チーム名">
      <label
        v-if="error.name"
        class="text-darkbrown"
        for="name">
        ※{{ error.name }}
      </label>
      <button
        type="
        submit"
        class="block mx-auto mt-4 px-7 py-3 text-xl rounded-xl bg-blue text-gray-10"
        @click="onSubmit()">
        登録
      </button>
    </formModal>
  </div>
</template>

<script>
import formModal from "~/components/SlotFormModal"
const teamsModel = {
  slug: "",
  name: ""
}

export default {
  components: {
    formModal
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

      const resStore = await this.$store.dispatch("addTeam", { teamInfo })
      if(!resStore) return

      if (resStore.status === "success") {
        this.$router.push(`/teams/${resStore.resFirestore.data.slug}`)
      } else if(resStore.status === "error" && resStore.message === "Slug is exist") {
        this.error.slug = "そのチームIDは既に存在します。別のIDを試してください。"
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
    }
  }
}
</script>
