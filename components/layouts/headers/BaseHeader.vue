<template>
  <header class="fixed top-0 w-full h-14 z-10 bg-gray-10 shadow-md">
    <UserHeader
      v-if="$store.getters.isAuthed"
      :is-loaded="isLoaded" />
    <GuestHeader
      v-if="!$store.getters.isAuthed"
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
