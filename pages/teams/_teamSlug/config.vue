<template>
  <div class="flex-ij-center h-full bg-gray-10">
    <div class="w-10/12 md:w-96 bg-secondary-20 p-8 rounded-lg shadow-xl">
      <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
        チーム情報の編集
      </h2>
      <TeamEdit :is-create="false" />
    </div>
  </div>
</template>

<script>
import TeamEdit from "~/components/parts/TeamEdit"
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
}
</script>
