<template>
  <div class="w-screen min-h-screen">
    <GuestHeader />
    <div class="relative w-full min-h-screen pt-14 pb-60">
      <div class="wrapper">
        <nuxt />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import GuestHeader from "~/components/modules/layouts/headers/GuestHeader"
import Footer from "~/components/modules/layouts/footers/Footer"

export default {
  components: {
    GuestHeader,
    Footer,
  },
}
</script>
