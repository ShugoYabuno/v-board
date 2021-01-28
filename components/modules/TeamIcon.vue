<template>
  <div class="w-9 h-9 rounded-full overflow-hidden">
    <CircleImg
      v-if="imgSrc"
      :img-src="imgSrc"
      alt="ユーザーアイコン" />
    <div
      v-else
      class="h-full w-full flex-ij-center bg-gray-60">
      <font-awesome-icon
        icon="users"
        class="bg-gray-60" />
    </div>
  </div>
</template>

<script>
import CircleImg from "~/components/parts/CircleImg"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faUsers)

export default {
  components: {
    CircleImg,
    FontAwesomeIcon
  },
  props: {
    imgSrc: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.imgSrc
  }
}
</script>
