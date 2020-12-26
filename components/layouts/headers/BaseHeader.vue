<template>
  <header class="fixed top-0 w-full h-14 bg-primary shadow-md">
    <UserHeader
      v-if="$store.getters.isSigned"
      :is-loaded="isLoaded" />
    <GuestHeader
      v-if="!$store.getters.isSigned"
      :is-loaded="isLoaded" />
  </header>
</template>

<script>
import UserHeader from "./_UserHeader"
import GuestHeader from "./_GuestHeader"

export default {
  components: {
    UserHeader,
    GuestHeader,
  },
  data() {
    return {
      isLoaded: false
    }
  },
  computed: {
    isShowHeaderContent() {
      return this.isLoaded
    }
  },
  mounted() {
    this.isLoaded = true
  }
}
</script>
