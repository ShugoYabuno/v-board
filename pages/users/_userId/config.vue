<template>
  <div class="flex-ij-center h-full bg-gray-10">
    <div class="w-10/12 md:w-96 bg-secondary-20 p-8 rounded-lg shadow-xl">
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
            v-if="isLoaded"
            :icon-type="'userIcons'"
            :icon-image-url="userInfo.iconImageUrl"
            :switch-on-upload="switchOnUpload"
            :insert-image-url="insertImageUrl" />
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
import Meta from "~/utils/mixins/meta"
import IconUploader from "~/components/parts/IconUploader"

const usersModel = {
  photoURL: "",
  displayName: ""
}

export default {
  components: {
    IconUploader
  },
  mixins: [Meta],
  layout: "user",
  data() {
    return {
      onUpload: false,
      error: {
        ...usersModel
      },
      userInfo: {
        ...usersModel
      },
      isLoaded: false
    }
  },
  async mounted() {
    const userInfo = this.$store.getters["userInfo"]

    const {
      documentId,
      iconImageUrl,
      displayName
    } = userInfo

    this.userInfo = {
      documentId,
      iconImageUrl,
      displayName
    }

    this.isLoaded = true
  },
  methods: {
    async onSubmit() {
      if(this.isError()) return

      const { userInfo } = this
      const { documentId } = userInfo
      delete userInfo.documentId

      const resUpdateTeam = await this.$store.dispatch("fsUpdate", {
        collectionName: "users",
        documentId,
        data: userInfo
      })
      if(!resUpdateTeam) return

      await this.$store.dispatch("setUserInfo", {
        userInfo: resUpdateTeam
      })
      const teamInfo = await this.$store.getters["teamInfo"]
      this.$router.push(`/teams/${teamInfo.slug}`)
    },
    isError() {
      if(this.userInfo.displayName.length > 30) {
        this.error.displayName = "ユーザー名は30文字以内で入力してください"
        return true
      } else if (!this.userInfo.displayName) {
        this.error.displayName = "入力してください"
        return true
      } else {
        this.error.displayName = ""
      }

      return false
    },
    switchOnUpload(_onUpload) {
      this.onUpload = _onUpload
    },
    insertImageUrl(_url) {
      this.userInfo.iconImageUrl = _url
    },
  },
}
</script>
