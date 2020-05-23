<template>
  <div id="wrapper">
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/Organisms/layouts/Header'

export default {
  components: {
    Header,
  },
}
</script>
