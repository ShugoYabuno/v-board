<template>
  <div class="flex-ij-center wrapper py-10 bg-gray-30">
    <formModal>
      <h2 class="mb-8 font-semibold text-center text-xl text-gray-90">
        チームの登録
      </h2>
      <TeamEdit :is-create="true" />
    </formModal>
  </div>
</template>

<script>
import formModal from "~/components/modules/SlotFormModal"
import TeamEdit from "~/components/parts/TeamEdit"

export default {
  components: {
    formModal,
    TeamEdit
  },
  // layout: "user",
}
</script>
