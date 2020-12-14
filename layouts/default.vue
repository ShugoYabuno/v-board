<template>
  <div class="flex flex-col w-screen min-h-screen">
    <GuestHeader />
    <div class="relative flex flex-col w-full flex-grow mt-14">
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import GuestHeader from "~/components/Organisms/layouts/GuestHeader"
import Footer from "~/components/Organisms/layouts/Footer"

export default {
  components: {
    GuestHeader,
    Footer,
  },
}
</script>
