<template>
  <CircleImg
    :img-src="userInfo.iconImageUrl"
    alt="ユーザーアイコン" />
</template>

<script>
import CircleImg from "~/components/parts/CircleImg"

export default {
  components: {
    CircleImg
  },
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    gettersUserInfo() {
      return this.$store.getters["userInfo"]
    },
  },
  watch: {
    gettersUserInfo(_value) {
      this.userInfo = _value
    },
  },
  async mounted() {
    this.userInfo = await this.$store.getters["userInfo"]
  },
}
</script>
