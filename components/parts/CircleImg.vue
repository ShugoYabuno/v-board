<template>
  <div class="w-full h-full rounded-full overflow-hidden">
    <img
      v-if="isLoaded && imgSrc"
      :src="imgSrc"
      :alt="alt"
      class="object-cover">
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    this.isLoaded = true
  }
}
</script>
