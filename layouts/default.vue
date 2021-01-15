<template>
  <div class="w-screen min-h-screen">
    <GuestHeader />
    <div class="w-full pt-14">
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import GuestHeader from "~/components/layouts/headers/GuestHeader"
import Footer from "~/components/layouts/footers/Footer"

export default {
  components: {
    GuestHeader,
    Footer,
  },
}
</script>
