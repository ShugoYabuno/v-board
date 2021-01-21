<template>
  <div
    v-if="visibleSidebar"
    class="fixed w-screen h-screen inset-0 flex z-20">
    <div class="w-60 h-full bg-white">
      <div class="p-1">
        <MenuBrand />
      </div>
      <SidebarContent />
    </div>
    <div
      v-if="visibleSidebar"
      class="flex-grow bg-gray-50 bg-opacity-50"
      @click="switchVisibleSidebar()" />
  </div>
</template>

<script>
import MenuBrand from "~/components/parts/MenuBrand"
import SidebarContent from "~/components/modules/layouts/sidebar/SidebarContent"

export default {
  components: {
    MenuBrand,
    SidebarContent,
  },
  data() {
    return {
      isVisibleSidebar: false
    }
  },
  computed: {
    storeVisibleSidebar() {
      return this.$store.getters["isVisibleSidebar"]
    },
    visibleSidebar() {
      return this.isVisibleSidebar
    }
  },
  watch: {
    storeVisibleSidebar(_value) {
      this.isVisibleSidebar =  _value
    }
  }
}
</script>
